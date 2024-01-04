import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.getValueStorage<number>(0);

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      // Process '(' and ')' as +1 or -1.
      if (v === '(') this.store.addNumberToValue(1);
      else this.store.subtractNumberFromValue(1);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = this.store.getValueAsString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
