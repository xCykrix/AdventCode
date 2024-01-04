import { InputCursor } from '../../util/input.ts';
import { AOC, InputType, STValue } from '../../util/state.ts';
import { permutations } from 'https://deno.land/x/combinatorics@1.1.2/mod.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<number>();
  private store = this.storage.getValueStorage<number>(0);
  private unique = new Set<string>();

  // Regular Expressions
  private parse = /(.*) would (gain|lose) (\d+) happiness units by sitting next to (.*)./;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      // Parse the Input State.
      const match = v.match(this.parse);
      const person1 = match![1]!;
      const action = match![2]!;
      const happiness = parseInt(match![3]!) * (action === 'gain' ? 1 : -1);
      const person2 = match![4]!;

      // Set the happiness units.
      this.map.set(`${person1}:${person2}`, new STValue(happiness));

      // Store each unique person.
      this.unique.add(person1);
      this.unique.add(person2);
    }

    for (const permutation of permutations(Array.from(this.unique.values()))) {
      let happiness = 0;
      const cursor = new InputCursor(permutation);

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
        happiness += (this.map.get(`${current}:${next}`)?.value) ?? 0;
        happiness += (this.map.get(`${next}:${current}`)?.value) ?? 0;
      }

      // Store max happiness.
      if (happiness > this.store.value!) {
        this.store.value = Math.max(happiness, this.store.value!);
      }
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${this.store.value}`;
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
