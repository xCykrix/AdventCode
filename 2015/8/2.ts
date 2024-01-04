import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  private store1 = this.storage.getValueStorage<number>(0);
  private store2 = this.storage.getValueStorage<number>(0);

  override async evaluate(): Promise<void> {
    for (let v of this.helper.getInput(InputType.LIST, '') as string) {
      // Add String Length to store1.
      this.store1.addNumberToValue(v.length);

      // Stringify the input to escape the needed characters.
      v = JSON.stringify(v);

      // Add String Length to store2 after JSON Stringify.
      this.store2.addNumberToValue(v.length);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${(this.store2.value! - this.store1.value!)}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
