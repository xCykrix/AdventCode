import { SeparatedListCursor } from '../../util/input.ts';
import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultCache = self.storage.getCache<string>('default');
    const memCache = self.storage.getCache<number>('MEM1');
    const resultStorage = self.storage.getStorage('output', '');
    const blacklist = ['ab', 'cd', 'pq', 'xy'];

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (const v of this.inputAsSeparatedList) {
      const cursor = new SeparatedListCursor(v);
      let blacklisted = false;
      let hasThreeVowels = false;
      let hasTwiceInRow = false;

      for (const blacklist of ['ab', 'cd', 'pq', 'xy']) {
        if (cursor.getAsString().includes(blacklist)) {
          blacklisted = true;
          break;
        }
      }

      memCache.deleteAll();
      while (cursor.hasNext()) {
        // Get Inputs and Step.
        const value = cursor.get()!;
        const previous = cursor.getPrev();
        const next = cursor.getNext();
        cursor.stepPositionForwards(1);
        memCache.addIntegerToValue(value, 1);

        // Rule: Two letters that appear twice in a row.
        if (blacklist.includes(`${value}${next}`)) {
          blacklisted = true;
        }
        if (value === previous || value === next) {
          hasTwiceInRow = true;
        }
      }
      if (blacklisted) continue;

      // Rule: At Least 3 Vowels
      let totalVowels = 0;
      for (const vowel of ['a', 'e', 'i', 'o', 'u']) {
        totalVowels += memCache.get(vowel) ?? 0;
      }
      if (totalVowels >= 3) {
        hasThreeVowels = true;
      }

      if (hasTwiceInRow && hasThreeVowels) {
        defaultCache.addValue(cursor.getAsString(), 'nice');
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

