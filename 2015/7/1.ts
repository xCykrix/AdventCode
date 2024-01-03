import { AOC, InputType, STValue } from '../../util/state.ts';

type WireOperation = 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT'
interface Wire {
  operation: WireOperation | null;
  args: (string | number)[];
}

function uint16 (n: number): number {
  return n & 0xFFFF;
}

class AOCDay extends AOC {
  private bitwise = {
    'AND': (n1: number, n2: number) => uint16(n1 & n2),
    'OR': (n1: number, n2: number) => uint16(n1 | n2),
    'NOT': (n1: number) => uint16(~n1),
    'LSHIFT': (n1: number, n2: number) => uint16(n1 << n2),
    'RSHIFT': (nq: number, n2: number) => uint16(nq >> n2)
  }
  private map = this.storage.getMapStorage<number | Wire>();

  // Regular Expressions
  private operationRegex = /[A-Z]+/g;
  private argsRegex = /[a-z0-9]+/g;

  private calculateWire(v: string | number | null): number | null {
    if (typeof v === 'number') return v;

    const wire = this.map.get(v ?? '')?.value ?? null;
    if (typeof wire === 'number') return wire;
    if (wire === null || v === null) return null;

    if (wire.operation === null) {
      this.map.set(v, new STValue(this.calculateWire(wire.args[0]!)!));
    } else {
      this.map.set(v, new STValue(this.bitwise[wire.operation](this.calculateWire(wire.args[0]!)!, this.calculateWire(wire.args[1]!)!)));
    }

    return this.map.get(v)!.value as number;
  }

  private generateWireCache(v: string): void {
    const operation = (v.match(this.operationRegex) ?? [null])[0] as WireOperation;
    const args = v.match(this.argsRegex)?.map(arg => isNaN(Number(arg)) ? arg : parseInt(arg))!;
    const destination = args?.pop() as string;

    this.map.set(destination, new STValue({
      operation,
      args,
    }));
  }

  override async evaluate(): Promise<void> {
    // Define Regular Expressions

    // Start of AOC
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      this.generateWireCache(v);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${this.calculateWire('a')}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();


  //   b?.start();
  //   for (const v of this.inputAsList) {
  //     generateWireCache(v);
  //   }
  //   const aToB = calculateWire('a')!;
  //   defaultCache.deleteAll();
  //   for (const v of this.inputAsList) {
  //     generateWireCache(v);
  //   }
  //   defaultCache.setValue('b', aToB);

  //   resultStorage.set(`${calculateWire('a')}`);
  //   b?.end();

  // }
