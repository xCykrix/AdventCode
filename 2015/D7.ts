import { ListInputType } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';
import { StoreValue, StoreValueMap } from 'framework/lib/storage.ts';

export type WireOperation = 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT';
export interface Wire {
  operation: WireOperation | null;
  args: (string | number)[];
}

enum RegExpIdentifiers {
  PARSE_INPUT_OP = 'PARSE_INPUT_OP',
  PARSE_INPUT_ARGS = 'PARSE_INPUT_ARGS',
}

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();

    CTFHelper.getRegularExpression().register(RegExpIdentifiers.PARSE_INPUT_OP, /[A-Z]+/g);
    CTFHelper.getRegularExpression().register(RegExpIdentifiers.PARSE_INPUT_ARGS, /[a-z0-9]+/g);

    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<number | Wire>();
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('').getList(ListInputType.LIST)!;

    for (const v of input) {
      Static.setWireState(v, map);
    }

    return `${Static.getWireState('a', map)}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const map1 = ctf.storage.getStoredMap<number | Wire>();
    const map2 = ctf.storage.getStoredMap<number | Wire>();
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('').getList(ListInputType.LIST)!;

    for (const v of input) {
      Static.setWireState(v, map1);
      Static.setWireState(v, map2);
    }
    const b = Static.getWireState('a', map1);
    map2.set('b', new StoreValue(b));

    return `${Static.getWireState('a', map2)}`;
  }
}

export class Static {
  private static bitwise = {
    'AND': (n1: number, n2: number) => CTFHelper.getMathExtension().uint16(n1 & n2),
    'OR': (n1: number, n2: number) => CTFHelper.getMathExtension().uint16(n1 | n2),
    'NOT': (n1: number) => CTFHelper.getMathExtension().uint16(~n1),
    'LSHIFT': (n1: number, n2: number) => CTFHelper.getMathExtension().uint16(n1 << n2),
    'RSHIFT': (nq: number, n2: number) => CTFHelper.getMathExtension().uint16(nq >> n2),
  }

  public static getWireState(v: string | number, map: StoreValueMap<number | Wire>): number {
    if (typeof v === 'number') return v;

    // Validate the wire types and return if a number is found and error if a null is found.
    const wire = map.get(v)?.get() ?? null;
    if (typeof wire === 'number') return wire;
    if (wire === null || v === null || wire === undefined || v === undefined) {
      return 0;
    }

    // Recursively search dependencies and calculate the wire state until a number is returned.
    if (wire.operation === null) {
      map.set(v, new StoreValue(this.getWireState(wire.args[0]!, map)));
    } else {
      const r = this.getWireState(wire.args[0]!, map)!;
      const z = this.getWireState(wire.args[1]!, map)!;
      const bw = this.bitwise[wire.operation](r, z);
      map.set(v, new StoreValue(bw));
    }

    return map.get(v)!.get() as number;
  }

  public static setWireState(v: string, map: StoreValueMap<number | Wire>): void {
    // Parse Wire Input.
    const operation = (v.match(CTFHelper.getRegularExpression().get(RegExpIdentifiers.PARSE_INPUT_OP)!) ?? [null])[0] as WireOperation;
    const args = v.match(CTFHelper.getRegularExpression().get(RegExpIdentifiers.PARSE_INPUT_ARGS)!)!.map((arg) => isNaN(Number(arg)) ? arg : parseInt(arg))!;
    const destination = args.pop() as string;

    // Write to Wire Cache.
    map.set(
      destination,
      new StoreValue({
        operation,
        args,
      }),
    );
  }
}

await CTF.do(new CTFExecute());
