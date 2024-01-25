import { ArrayCursor } from '../../util/helper/arrayCursor.ts';
import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<boolean>();
  private cache = this.storage.makeStoredMap<number>();

  override async evaluate(): Promise<void> {
    const blacklisted = ['ab', 'cd', 'pq', 'xy'];
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, '')) {
      // Process the input.
      const cursor = new ArrayCursor(v as string[]);
      let blacklistFound = false;
      let hasThreeVowels = false;
      let hasTwiceInRow = false;
      this.cache.clear();

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
        this.cache.addIntegerToValue(value, 1);

        // Rule 2: Two letters that appear twice in a row.
        if (value === previous || value === next) {
          hasTwiceInRow = true;
        }
      }

      // Rule 1: At Least 3 Vowels.
      let totalVowels = 0;
      for (const vowel of vowels) {
        totalVowels += this.cache.get(vowel)?.get() ?? 0;
      }
      if (totalVowels >= 3) {
        hasThreeVowels = true;
      }

      // Check Validation
      if (hasTwiceInRow && hasThreeVowels) {
        this.map.set(cursor.getAsString(), new StoreValue(true));
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.map.size}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
