import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<boolean>();

  // At X and Y of Map, get 3x3 Grid Results that are turned on.
  private getNextState(x: number, y: number): number {
    let count = this.map.get(`${x}:${y}`)!.get() === true ? -1 : 0;
    for (let ty = 0; ty < 3; ty++) {
      for (let tx = 0; tx < 3; tx++) {
        if (this.map.get(`${x + tx - 1}:${y + ty - 1}`)?.get()) {
          count++;
        }
      }
    }
    return count;
  }

  override async evaluate(): Promise<void> {
    let y = 0;
    // Process the input.
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, '')) {
      let x = 0;
      for (const state of v) {
        this.map.set(`${x}:${y}`, new StoreValue((state === '#') ? true : false));
        x++;
      }
      y++;
    }

    // Run what is essentially The Game of Life 100 Iterations.
    for (let _ = 0; _ < 100; _++) {
      let updates: [string, boolean][] = [];
      // Iter 100 Rows of Y.
      for (let y = 0; y < 100; y++) {
        // Iter 100 Columns of X.
        for (let x = 0; x < 100; x++) {
          // Get current and next state.
          const current = this.map.get(`${x}:${y}`)!.get();
          const next = this.getNextState(x, y);

          // Run the Light Simulation.
          if (current === true) {
            // If 2 or 3 neighbors. Light stays on.
            if (next === 2 || next === 3) {
              updates.push([`${x}:${y}`, true]);
            } else {
              // Else. Light turns off.
              updates.push([`${x}:${y}`, false]);
            }
          } else if (next === 3) {
            // If has 3 neighbors and off. Light turns on.
            updates.push([`${x}:${y}`, true]);
          }
        }
      }

      // All state updates happen simultaneously. Run all updates at end of frame.
      for (const update of updates) {
        this.map.set(update[0], new StoreValue(update[1]));
      }
      updates = [];
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${Array.from(this.map.values()).filter((v) => v.get() === true).length.toString()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
