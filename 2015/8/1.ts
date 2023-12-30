import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const mem1 = self.storage.getStorage('MEM1', 0);
    const mem2 = self.storage.getStorage('MEM2', 0);
    const resultStorage = self.storage.getStorage('output', '');

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (let v of this.inputAsList) {
      mem1.addInteger(v.length);

      v = v.replace(/\\x([a-f\d]{2})/g, "\\u00$1")
      v = JSON.parse(v);
      mem2.addInteger(v.length);
    }
    b?.end();

    // Store Result.
    resultStorage.set(`${(mem1.get() - mem2.get())}`);
  }
}

// Execute AOC.
const aoc = new AOC('LIST', '');
await aoc.execute();
