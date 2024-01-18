import { ArrayCursor } from '../../util/helper/arrayCursor.ts';
import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

import { permutations } from 'x/combinatorics@1.1.2/mod.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<number>();
  private store = this.storage.makeStoredValue<number>(0);
  private unique = new Set<string>();

  // Regular Expressions
  private parse = /(.*) to (.*) = (\d+)/;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '')) {
      // Process the input.
      const match = v.match(this.parse);
      const start = match![1]!;
      const end = match![2]!;
      const distance = parseInt(match![3]!);
      // Add start:end and end:start with distance.
      this.map.set(`${start}:${end}`, new StoreValue(distance));
      this.map.set(`${end}:${start}`, new StoreValue(distance));
      // Add unique list.
      this.unique.add(start);
      this.unique.add(end);
    }

    for (const permutation of permutations(Array.from(this.unique.values()))) {
      let distance = 0;
      const cursor = new ArrayCursor(permutation);

      // Iterate the ArrayCursor.
      while (cursor.hasNext()) {
        const current = cursor.get();
        const next = cursor.getNext();
        cursor.stepPositionForwards(1);
        if (next === null) continue;

        // Add the Distance of the Next Step Lookup.
        distance += this.map.get(`${current}:${next}`)!.get();
      }

      // Store the Maximum Distance.
      this.store.set(Math.max(distance, this.store.get()));
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.get()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
