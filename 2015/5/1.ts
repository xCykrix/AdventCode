import { InputCursor } from '../../util/input.ts';
import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultMap = this.storage.getMapStorage<boolean>();
    const cache = this.storage.getMapStorage<number>();
    const blacklisted = ['ab', 'cd', 'pq', 'xy']
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    // Start of AOC
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, '')) {
      const cursor = new InputCursor(v as string[]);
      let blacklistFound = false;
      let hasThreeVowels = false;
      let hasTwiceInRow = false;
      cache.clear();

      // Rule 3: Check for Blacklisted Combinations.
      for (const blacklist of blacklisted) {
        if (cursor.getAsString().includes(blacklist)) {
          blacklistFound = true;
          break;
        }
      }
      if (blacklistFound) continue;

      while (cursor.hasNext()) {
        // Get Inputs and Step.
        const value = cursor.get()!;
        const previous = cursor.getPrev();
        const next = cursor.getNext();
        cursor.stepPositionForwards(1);
        cache.addIntegerToValue(value, 1);

        // Rule 2: Two letters that appear twice in a row.
        if (value === previous || value === next) {
          hasTwiceInRow = true;
        }
      }

      // Rule 1: At Least 3 Vowels.
      let totalVowels = 0;
      for (const vowel of vowels) {
        totalVowels += cache.get(vowel)?.value ?? 0;
      }
      if (totalVowels >= 3) {
        hasThreeVowels = true;
      }

      if (hasTwiceInRow && hasThreeVowels) {
        defaultMap.set(cursor.getAsString(), new STValue(true));
      }
    }

    // Store Result of AOC.
    this.storage.getValueStorage(0, 'value').value = defaultMap.size;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
