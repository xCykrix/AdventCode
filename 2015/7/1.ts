import { AOCBase } from '../../util/state.ts';

type WireOperation = 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT'
interface Wire {
  operation: WireOperation | null;
  args: (string | number)[];
}

class AOC extends AOCBase {
  public bitwise = {
    'AND': (n1: number, n2: number) => uint16(n1 & n2),
    'OR': (n1: number, n2: number) => uint16(n1 | n2),
    'NOT': (n1: number) => uint16(~n1),
    'LSHIFT': (n1: number, n2: number) => uint16(n1 << n2),
    'RSHIFT': (nq: number, n2: number) => uint16(nq >> n2)
  }

  override async evaluate(b: Deno.BenchContext | null, self: AOC): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultCache = self.storage.getCache<number | Wire>('default');
    const resultStorage = self.storage.getStorage('output', '');

    const operationRegex = /[A-Z]+/g;
    const argsRegex = /[a-z0-9]+/g;

    // Execute AOC and Benchmarks (if applicable).
    function generateWireCache(v: string): void {
      const operation = (v.match(operationRegex) ?? [null])[0] as WireOperation;
      const args = v.match(argsRegex)?.map(arg => isNaN(Number(arg)) ? arg : parseInt(arg))!;
      const destination = args?.pop() as string;

      defaultCache.setValue(destination, {
        operation,
        args,
      });
    }

    function calculateWire(v: string | number | null): number | null {
      if (typeof v === 'number') return v;

      const wire = defaultCache.get(v ?? '');
      if (typeof wire === 'number') return wire;
      if (wire === null || v === null) return null;

      if (wire.operation === null) {
        defaultCache.setValue(v, calculateWire(wire.args[0]!)!);
      } else {
        defaultCache.setValue(v, self.bitwise[wire.operation](calculateWire(wire.args[0]!)!, calculateWire(wire.args[1]!)!));
      }

      return defaultCache.get(v) as number;
    }

    b?.start();
    for (const v of this.inputAsList) {
      generateWireCache(v);
    }
    resultStorage.set(`${calculateWire('a')}`);
    b?.end();

  }

}

function uint16 (n: number): number {
  return n & 0xFFFF;
}

// Execute AOC.
const aoc = new AOC('LIST', '');
await aoc.execute();
