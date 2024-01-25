import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

import { combinations } from 'x/combinatorics@1.1.2/mod.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number[]>([]);
  private count = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    // Process the input.
    for (const v of this.helper.getInput(InputType.LIST)) {
      this.store.get().push(parseInt(v));
    }

    // Iterate over all combinations of the containers by size.
    for (let i = 1; i < this.store.get().length - 1; i++) {
      // Iterate over i number of containers in all possible combinations.
      for (const combination of combinations(this.store.get(), i)) {
        const totalSize = combination.reduce((i, container) => i = i + container, 0);
        // Check if totalSize is 150 and note 1 additional proper combination.
        if (totalSize === 150) {
          this.count.add(1);
        }
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.count.toString()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
