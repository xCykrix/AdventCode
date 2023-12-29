import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultCache = self.storage.getCache<boolean>('default');
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
            defaultCache.addValue(`${tx1}:${ty1}`, true);
          }
          if (action === 'turn off') {
            defaultCache.addValue(`${tx1}:${ty1}`, false);
          }
          if (action === 'toggle') {
            defaultCache.addValue(`${tx1}:${ty1}`, !(defaultCache.get(`${tx1}:${ty1}`) ?? false));
          }
        }
      }
    }
    b?.end();

    // Store Result.
    resultStorage.set(defaultCache.getAll().filter(([_k, v]) => {
      return v === true;
    }).length.toString());
  }
}

// Execute AOC.
const aoc = new AOC('LIST', '');
await aoc.execute();
