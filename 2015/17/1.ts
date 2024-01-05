import { AOC, InputType } from '../../util/state.ts';
import { combinations } from 'https://deno.land/x/combinatorics@1.1.2/mod.ts';

class AOCDay extends AOC {
  private store = this.storage.getValueStorage<number[]>([]);
  private count = this.storage.getValueStorage<number>(0);

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      this.store.value!.push(parseInt(v));
    }

    for (let i = 1; i < this.store.value!.length - 1; i++) {
      for (const combination of combinations(this.store.value!, i)) {
        const totalSize = combination.reduce((i, container) => i = i + container, 0);
        if (totalSize === 150) {
          this.count.value! = this.count.value! + 1;
        }
      }
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = this.count.getValueAsString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
