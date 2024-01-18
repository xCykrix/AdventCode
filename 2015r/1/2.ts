import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(0);
  private counter = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      // Process the input.
      if (v === '(') this.store.add(1);
      else this.store.subtract(1);

      // Increment the counter.
      this.counter.add(1);

      // If we enter the basement, break.
      if (this.store.get() < 0) {
        break;
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(this.counter.toString());
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
