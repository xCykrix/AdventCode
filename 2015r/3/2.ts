import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<number>();
  private step = this.storage.makeStoredValue<boolean>(true);
  private sx = this.storage.makeStoredValue<number>(0);
  private sy = this.storage.makeStoredValue<number>(0);
  private rx = this.storage.makeStoredValue<number>(0);
  private ry = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    this.map.set(`0:0`, new StoreValue<number>(1));

    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      // Process the input (^ v < >) characters in 2d plane.
      // Split apart the Santa and Robot-Santa steps.
      switch (v) {
        case '^': {
          if (this.step.get() === true) this.sy.add(1);
          else this.ry.add(1);
          break;
        }
        case 'v': {
          if (this.step.get() === true) this.sy.subtract(1);
          else this.ry.subtract(1);
          break;
        }
        case '>': {
          if (this.step.get() === true) this.sx.add(1);
          else this.rx.add(1);
          break;
        }
        case '<': {
          if (this.step.get() === true) this.sx.subtract(1);
          else this.rx.subtract(1);
          break;
        }
      }

      // Store the present being delivered to point by Santa or Robot-Santa.
      this.map.addIntegerToValue(this.step.get() ? `${this.sx}:${this.sy}` : `${this.rx}:${this.ry}`, 1);

      // Toggle the Step State.
      this.step.toggle();
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.map.size}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
