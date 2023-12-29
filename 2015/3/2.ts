import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultCache = self.storage.getCache('default');
    const resultStorage = self.storage.getStorage('output', '');

    // Add Default Cache
    defaultCache.addValue('0:0', 0);
    let robotSantaTurn = false;
    let ax = 0;
    let ay = 0;
    let bx = 0;
    let by = 0;

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (const v of this.inputAsSeparatedList[0]!) {
      // Process the input.
      switch(v) {
        case '^': {
          if (!robotSantaTurn) ay = ay + 1;
          else by = by + 1;
          break;
        }
        case 'v': {
          if (!robotSantaTurn) ay = ay - 1;
          else by = by - 1;
          break;
        }
        case '>': {
          if (!robotSantaTurn) ax = ax + 1;
          else bx = bx + 1;
          break;
        }
        case '<': {
          if (!robotSantaTurn) ax = ax - 1;
          else bx = bx - 1;
          break;
        }
      }

      if (!robotSantaTurn) {
        defaultCache.addIntegerToValue(`${ax}:${ay}`, 1);
        robotSantaTurn = true;
        continue;
      } else {
        defaultCache.addIntegerToValue(`${bx}:${by}`, 1);
        robotSantaTurn = false;
        continue;
      }
    }
    b?.end();

    // Store Result.
    resultStorage.set(`${defaultCache.getSize()}`);
  }
}

// Execute AOC.
const aoc = new AOC('SEPARATED_LIST', '');
await aoc.execute();
