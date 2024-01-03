import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<number>();
  private step = this.storage.getValueStorage<boolean>(true);
  private sx = this.storage.getValueStorage<number>(0);
  private sy = this.storage.getValueStorage<number>(0);
  private rx = this.storage.getValueStorage<number>(0);
  private ry = this.storage.getValueStorage<number>(0);

  override async evaluate(): Promise<void> {
    this.map.set(`0:0`, new STValue<number>(1));

    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      switch (v) {
        case '^': {
          if (this.step.value === true) this.sy.addNumberToValue(1)
          else this.ry.addNumberToValue(1);
          break;
        }
        case 'v': {
          if (this.step.value === true) this.sy.subtractNumberFromValue(1)
          else this.ry.subtractNumberFromValue(1);
          break;
        }
        case '>': {
          if (this.step.value === true) this.sx.addNumberToValue(1)
          else this.rx.addNumberToValue(1);
          break;
        }
        case '<': {
          if (this.step.value === true) this.sx.subtractNumberFromValue(1)
          else this.rx.subtractNumberFromValue(1);
          break;
        }
      }

      this.map.addIntegerToValue(this.step.value ? `${this.sx}:${this.sy}` : `${this.rx}:${this.ry}`, 1);
      this.step.value = !this.step.value;
    }

    // Store Result of AOC.
    this.storage.getValueStorage(0, 'value').value = this.map.size;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
