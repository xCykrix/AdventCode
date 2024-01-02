import { InputCursor } from '../../util/input.ts';
import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultMap = this.storage.getMapStorage<boolean>();

    // Start of AOC
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, '')) {
      const cursor = new InputCursor(v as string[]);
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
