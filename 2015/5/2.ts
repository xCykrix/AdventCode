import { SeparatedListCursor } from '../../util/input.ts';
import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultCache = self.storage.getCache<string>('default');
    const resultStorage = self.storage.getStorage('output', '');

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (const v of this.inputAsSeparatedList) {
      const cursor = new SeparatedListCursor(v);
      let has2Matches = false;
      let hasSingleCharacter = false;

      while (cursor.hasNext()) {
        // Get Inputs and Step.
        const value = cursor.get()!;
        const next = cursor.getNext();
        cursor.stepPositionForwards(1);

        // Check for Pattern without overlapping.
        const pattern = new RegExp(`(${value}${next})`, 'g');
        const match = cursor.getAsString().match(pattern);
        if ((match?.length ?? 0) >= 2) {
          has2Matches = true;
        }

        // Check for Pattern with Single-Character.
        const pattern2 = new RegExp(`(${value}.${value})`, 'g');
        const match2 = cursor.getAsString().match(pattern2);
        if ((match2?.length ?? 0) >= 1) {
          hasSingleCharacter = true;
        }
      }

      if (has2Matches && hasSingleCharacter) {
        defaultCache.setValue(cursor.getAsString(), 'nice');
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
