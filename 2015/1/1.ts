import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultStorage = this.storage.getValueStorage<number>(0);

    // Start of AOC
    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      if (v === '(') defaultStorage.addNumberToValue(1);
      else defaultStorage.subtractNumberFromValue(1);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = defaultStorage.getValueAsString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
