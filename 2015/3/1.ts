import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultMap = this.storage.getMapStorage<number>();

    // Current Coordinates
    const x = this.storage.getValueStorage<number>(0);
    const y = this.storage.getValueStorage<number>(0);

    // Load 0:0 to Cache
    defaultMap.set(`0:0`, new STValue<number>(1));

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

      defaultMap.addIntegerToValue(`${x}:${y}`, 1);
    }

    // Store Result of AOC.
    this.storage.getValueStorage(0, 'value').value = defaultMap.size;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
