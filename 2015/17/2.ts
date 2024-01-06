import { AOC, InputType } from '../../util/state.ts';
import { combinations } from 'https://deno.land/x/combinatorics@1.1.2/mod.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number[]>([]);
  private count = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      this.store.get().push(parseInt(v));
    }

    let min = Infinity;
    for (let i = 1; i < this.store.get().length - 1; i++) {
      for (const combination of combinations(this.store.get(), i)) {
        const totalSize = combination.reduce((i, container) => i = i + container, 0);
        if (totalSize === 150) {
          min = Math.min(min, combination.length);
        }
      }
    }

    for (const combination of combinations(this.store.get(), min)) {
      const totalSize = combination.reduce((i, container) => i = i + container, 0);
      if (totalSize === 150) {
        this.count.add(1);
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.count.toString()}`);
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
