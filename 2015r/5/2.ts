import { ArrayCursor } from '../../util/helper/arrayCursor.ts';
import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<boolean>();

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, '')) {
      // Process the input.
      const cursor = new ArrayCursor(v as string[]);
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

      // Check Validation
      if (has2Matches && hasSingleCharacter) {
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
