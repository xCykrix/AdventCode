import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultCache = self.storage.getCache<number>('default');
    const resultStorage = self.storage.getStorage('output', '');

    // Load Regular Expressions
    const parseCommand = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (const v of this.inputAsList) {
      let [action, x, y, x2, y2] = ['off', 0, 0, 0, 0];
      const match = v.match(parseCommand);
      if (match === null) throw new Error('Unexpected null match.');
      action = match[1]!;
      x = parseInt(match[2]!);
      y = parseInt(match[3]!);
      x2 = parseInt(match[4]!);
      y2 = parseInt(match[5]!);

      for (let tx1 = x; tx1 <= x2; tx1++) {
        for (let ty1 = y; ty1 <= y2; ty1++) {
          if (action === 'turn on') {
            defaultCache.addIntegerToValue(`${tx1}:${ty1}`, 1);
          }
          if (action === 'turn off') {
            if ((defaultCache.get(`${tx1}:${ty1}`) ?? 0) <= 0) continue;
            defaultCache.subtractIntegerFromValue(`${tx1}:${ty1}`, 1);
          }
          if (action === 'toggle') {
            defaultCache.addIntegerToValue(`${tx1}:${ty1}`, 2);
          }
        }
      }
    }
    b?.end();

    // Store Result.
    let r = 0;
    defaultCache.getAll().map(([_k, v]) => {
      r = r + v;
    });
    resultStorage.set(`${r}`);
  }
}

// Execute AOC.
const aoc = new AOC('LIST', '');
await aoc.execute();
