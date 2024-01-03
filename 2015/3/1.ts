import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<number>();
  private x = this.storage.getValueStorage<number>(0);
  private y = this.storage.getValueStorage<number>(0);

  override async evaluate(): Promise<void> {
    this.map.set(`0:0`, new STValue<number>(1));

    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      switch (v) {
        case '^': {
          this.y.addNumberToValue(1);
          break;
        }
        case 'v': {
          this.y.subtractNumberFromValue(1);
          break;
        }
        case '>': {
          this.x.addNumberToValue(1);
          break;
        }
        case '<': {
          this.x.subtractNumberFromValue(1);
          break;
        }
      }

      this.map.addIntegerToValue(`${this.x}:${this.y}`, 1);
    }

    // Store Result of AOC.
    this.storage.getValueStorage(0, 'value').value = this.map.size;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
