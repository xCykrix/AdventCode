import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultStorage = self.storage.getStorage('default', 0);
    const resultStorage = self.storage.getStorage('output', '');

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (const v of this.inputAsSeparatedList[0]!) {
      if (v === '(') {
        defaultStorage.addInteger();
      }
      if (v === ')') {
        defaultStorage.subtractInteger();
      }
    }
    b?.end();

    // Store Result.
    resultStorage.set(defaultStorage.getAsString());
  }
}

// Execute AOC.
const aoc = new AOC('SEPARATED_LIST', '');
await aoc.execute();
