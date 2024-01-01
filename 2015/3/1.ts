import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultStorage = this.storage.getValueStorage<number>(0);
    const defaultMap = this.storage.getMapStorage<number>();

    // Current Coordinates
    let x = this.storage.getValueStorage<number>(0);
    let y = this.storage.getValueStorage<number>(0);

    // Start of AOC
    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      switch (v) {
        case '^': {
          y.addNumberToValue(1);
          break;
        }
        case 'v': {
          y.subtractNumberFromValue(1);
          break;
        }
        case '>': {
          x.addNumberToValue(1);
          break;
        }
        case '<': {
          x.subtractNumberFromValue(1);
          break;
        }
      }

      defaultMap.addIntegerToValue(`${x.value}:${y.value}`, 1);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = defaultStorage.getValueAsString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
