import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultCache = self.storage.getCache('default');
    const resultStorage = self.storage.getStorage('output', '');

    // Add Default Cache
    defaultCache.setValue('0:0', 0);
    let x = 0;
    let y = 0;

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (const v of this.inputAsSeparatedList[0]!) {
      // Process the input.
      switch (v) {
        case '^': {
          y = y + 1;
          break;
        }
        case 'v': {
          y = y - 1;
          break;
        }
        case '>': {
          x = x + 1;
          break;
        }
        case '<': {
          x = x - 1;
          break;
        }
      }

      // Update cached plane.
      defaultCache.addIntegerToValue(`${x}:${y}`, 1);
    }
    b?.end();

    // Store Result.
    resultStorage.set(`${defaultCache.getSize()}`);
  }
}

// Execute AOC.
const aoc = new AOC('SEPARATED_LIST', '');
await aoc.execute();
