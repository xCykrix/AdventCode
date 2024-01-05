import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  private store1 = this.storage.makeStoredValue<number>(0);
  private store2 = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    for (let v of this.helper.getInput(InputType.LIST, '') as string) {
      // Add String Length to store1.
      this.store1.add(v.length);

      // Replace \x00 format to \u0000 format.
      // This can also be achieved in a more simple way with eval.
      // However, I opted to not use this method.
      v = v.replace(/\\x([a-f\d]{2})/g, '\\u00$1');

      // Parse input as JSON.
      v = JSON.parse(v);

      // Add String Length to store2 after JSON Parse.
      this.store2.add(v.length);
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${(this.store1.get() - this.store2.get())}`);
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
