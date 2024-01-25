import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private start = this.storage.makeStoredValue<number>(0);
  private end = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    for (let v of this.helper.getInput(InputType.LIST)) {
      // Add String Length to start value.
      this.start.add(v.length);

      // Stringify the input to escape the needed characters.
      v = JSON.stringify(v);

      // Add String Length to end value after JSON Stringify.
      this.end.add(v.length);
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${Math.abs(this.end.get() - this.start.get())}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
