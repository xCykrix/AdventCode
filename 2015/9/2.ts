import { InputCursor } from '../../util/input.ts';
import { AOC, InputType, STValue } from '../../util/state.ts';
import { permutations } from 'https://deno.land/x/combinatorics@1.1.2/mod.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<number>();
  private store = this.storage.getValueStorage<number>(0);
  private unique = new Set<string>();

  // Regular Expressions
  private parse = /(.*) to (.*) = (\d+)/;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      // Parse the Input State.
      const match = v.match(this.parse);
      const start = match![1]!;
      const end = match![2]!;
      const distance = parseInt(match![3]!);
      // Add start:end and end:start with distance.
      this.map.set(`${start}:${end}`, new STValue(distance));
      this.map.set(`${end}:${start}`, new STValue(distance));
      // Add unique list.
      this.unique.add(start);
      this.unique.add(end);
    }

    for (const permutation of permutations(Array.from(this.unique.values()))) {
      let distance = 0;
      const cursor = new InputCursor(permutation);

      // Iterate the InputCursor.
      while (cursor.hasNext()) {
        const current = cursor.get();
        const next = cursor.getNext();
        cursor.stepPositionForwards(1);
        if (next === null) continue;

        // Add the Distance of the Next Step Lookup.
        distance += this.map.get(`${current}:${next}`)!.value!;
      }

      // Store the Maximum Distance.
      this.store.value = Math.max(distance, this.store.value!);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${this.store.value}`;
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
