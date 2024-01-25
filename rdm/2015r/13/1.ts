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
  private parse = /(.*) would (gain|lose) (\d+) happiness units by sitting next to (.*)./;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST)) {
      // Process the input.
      const match = v.match(this.parse);
      const person1 = match![1]!;
      const action = match![2]!;
      const happiness = parseInt(match![3]!) * (action === 'gain' ? 1 : -1);
      const person2 = match![4]!;

      // Set the happiness units.
      this.map.set(`${person1}:${person2}`, new StoreValue(happiness));

      // Store each unique person.
      this.unique.add(person1);
      this.unique.add(person2);
    }

    for (const permutation of permutations(Array.from(this.unique.values()))) {
      let happiness = 0;
      const cursor = new ArrayCursor(permutation);

      // Iterate the cursor.
      while (cursor.hasNext()) {
        const start = cursor.getAt(0);
        const current = cursor.get();
        let next = cursor.getNext();
        cursor.stepPositionForwards(1);

        // Loop around to beginning from the end to get last change.
        if (next === null) {
          next = start;
        }

        // Add Happiness Changes of Current and Next Person. Last person uses first position.
        happiness += (this.map.get(`${current}:${next}`)?.get()) ?? 0;
        happiness += (this.map.get(`${next}:${current}`)?.get()) ?? 0;
      }

      // Store max happiness.
      this.store.set(Math.max(happiness, this.store.get()));
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.get()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
