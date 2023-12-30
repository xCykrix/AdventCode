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
      // mem1.addInteger(v.length);
      v = v.replace(/^"/, '"\\"').replace(/\"$/, '\\""')
      console.info(v);
      console.info(JSON.parse(v))
      // v.replaceAll(/(\\x[a-f0-9]{2})/g, '_');
    }
    b?.end();

    // Store Result.
    // resultStorage.set(defaultStorage.getAsString());
  }
}

// Execute AOC.
const aoc = new AOC('LIST', '');
await aoc.execute();
