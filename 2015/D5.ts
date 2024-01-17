import { ListInputType } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { StoreValue } from 'framework/lib/storage.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<boolean>();
    const cache = ctf.storage.getStoredMap<number>();
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('').getList(ListInputType.SEPARATED_LIST)!;

    const blacklisted = ['ab', 'cd', 'pq', 'xy'];
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    for (const v of input) {
      const cursor = CTFHelper.getCursor(v);
      let blacklistFound = false;
      let hasThreeVowels = false;
      let hasTwiceInRow = false;
      cache.clear();

      // Rule 3: Check for Blacklisted Combinations.
      for (const blacklist of blacklisted) {
        if (v.join('').includes(blacklist)) {
          blacklistFound = true;
          break;
        }
      }
      if (blacklistFound) continue;

      while (cursor.get() !== null) {
        const value = cursor.get()!;
        const previous = cursor.getPrevious();
        const next = cursor.getNext();
        cache.add(value, 1);
        cursor.step(1);

        // Rule 2: Two letters that appear twice in a row.
        if (value === previous || value === next) {
          hasTwiceInRow = true;
        }
      }

      // Rule 1: At Least 3 Vowels.
      let totalVowels = 0;
      for (const vowel of vowels) {
        totalVowels += cache.get(vowel)?.get() ?? 0;
      }
      if (totalVowels >= 3) {
        hasThreeVowels = true;
      }

      // Check Validation
      if (hasTwiceInRow && hasThreeVowels) {
        map.set(v.join(''), new StoreValue(true));
      }
    }

    return `${map.size}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<boolean>();
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('').getList(ListInputType.SEPARATED_LIST)!;

    for (const v of input) {
      const cursor = CTFHelper.getCursor(v);
      let has2Matches = false;
      let hasSingleCharacter = false;

      while (cursor.get() !== null) {
        // Get Inputs and Step.
        const value = cursor.get()!;
        const next = cursor.getNext();
        cursor.step(1);

        // Check for Pattern without overlapping.
        const pattern = new RegExp(`(${value}${next})`, 'g');
        const match = v.join('').match(pattern);
        if ((match?.length ?? 0) >= 2) {
          has2Matches = true;
        }

        // Check for Pattern with Single-Character.
        const pattern2 = new RegExp(`(${value}.${value})`, 'g');
        const match2 = v.join('').match(pattern2);
        if ((match2?.length ?? 0) >= 1) {
          hasSingleCharacter = true;
        }
      }

      // Check Validation
      if (has2Matches && hasSingleCharacter) {
        map.set(v.join(''), new StoreValue(true));
      }
    }

    return `${map.size}`;
  }
}

await CTF.do(new CTFExecute());
