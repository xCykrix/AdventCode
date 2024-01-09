import { InputType } from '../../util/helper/input.ts';
import { uint16 } from '../../util/number/uint16.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

type WireOperation = 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT';
interface Wire {
  operation: WireOperation | null;
  args: (string | number)[];
}

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<number | Wire>();

  // Fast bitwise helper functions.
  private bitwise = {
    'AND': (n1: number, n2: number) => uint16(n1 & n2),
    'OR': (n1: number, n2: number) => uint16(n1 | n2),
    'NOT': (n1: number) => uint16(~n1),
    'LSHIFT': (n1: number, n2: number) => uint16(n1 << n2),
    'RSHIFT': (nq: number, n2: number) => uint16(nq >> n2),
  };

  // Regular Expressions
  private operationRegex = /[A-Z]+/g;
  private argsRegex = /[a-z0-9]+/g;

  private getWireState(v: string | number): number {
    if (typeof v === 'number') return v;

    // Validate the wire types and return if a number is found and error if a null is found.
    const wire = this.map.get(v ?? '')?.get() ?? null;
    if (typeof wire === 'number') return wire;
    if (wire === null || v === null || wire === undefined || v === undefined) {
      throw new Error('getWireState(): encountered a null or undefined where not expected');
    }

    // Recursively search dependencies and calculate the wire state until a number is returned.
    if (wire.operation === null) {
      this.map.set(v, new StoreValue(this.getWireState(wire.args[0]!)));
    } else {
      this.map.set(v, new StoreValue(this.bitwise[wire.operation](this.getWireState(wire.args[0]!), this.getWireState(wire.args[1]!))));
    }

    return this.map.get(v)!.get() as number;
  }

  private setWireState(v: string): void {
    // Parse Wire Input.
    const operation = (v.match(this.operationRegex) ?? [null])[0] as WireOperation;
    const args = v.match(this.argsRegex)?.map((arg) => isNaN(Number(arg)) ? arg : parseInt(arg))!;
    const destination = args?.pop() as string;

    // Write to Wire Cache.
    this.map.set(
      destination,
      new StoreValue({
        operation,
        args,
      }),
    );
  }

  override async evaluate(): Promise<void> {
    // Generate the Wire Cache.
    for (const v of this.helper.getInput(InputType.LIST)) {
      this.setWireState(v);
    }

    // Calculate 'a'.
    const a = this.getWireState('a');

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${a}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
