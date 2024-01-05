import { AOC, InputType, StoreValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<number>();
  private x = this.storage.makeStoredValue<number>(0);
  private y = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    this.map.set(`0:0`, new StoreValue<number>(1));

    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      // Process the input (^ v < >) characters in 2d plane.
      switch (v) {
        case '^': {
          this.y.add(1);
          break;
        }
        case 'v': {
          this.y.subtract(1);
          break;
        }
        case '>': {
          this.x.add(1);
          break;
        }
        case '<': {
          this.x.subtract(1);
          break;
        }
      }

      // Store the present being delivered to point.
      this.map.addIntegerToValue(`${this.x}:${this.y}`, 1);
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.map.size}`);
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
