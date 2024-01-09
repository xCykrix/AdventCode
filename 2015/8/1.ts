import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private start = this.storage.makeStoredValue<number>(0);
  private end = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    for (let v of this.helper.getInput(InputType.LIST)) {
      // Add String Length to start value.
      this.start.add(v.length);

      // Replace \x00 format to \u0000 format.
      // This can also be achieved in a more simple way with eval.
      // However, I opted to not use this method.
      v = v.replace(/\\x([a-f\d]{2})/g, '\\u00$1');

      // Parse input as JSON.
      v = JSON.parse(v);

      // Add String Length to end value after JSON Parse.
      this.end.add(v.length);
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${Math.abs(this.end.get() - this.start.get())}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
