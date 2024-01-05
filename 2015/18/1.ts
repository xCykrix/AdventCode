import { AOC, InputType, StoreValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<boolean>();

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
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, '') as string[][]) {
      let x = 0;
      for (const state of v) {
        this.map.set(`${x}:${y}`, new StoreValue((state === "#") ? true : false));
        x++;
      }
      y++;
    }

    for (let _ = 0; _ < 100; _++) {
      let updates: [string, boolean][] = [];
      for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 100; x++) {
          const current = this.map.get(`${x}:${y}`)!.get();
          const next = this.getNextState(x, y);
          if (current === true) {
            if (next === 2 || next === 3) {
              updates.push([`${x}:${y}`, true]);
            } else {
              updates.push([`${x}:${y}`, false]);
            }
          } else if (next === 3) {
            updates.push([`${x}:${y}`, true]);
          }
        }
      }
      for (const update of updates) {
        this.map.set(update[0], new StoreValue(update[1]));
      }
      updates = [];
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${Array.from(this.map.values()).filter((v) => v.get() === true).length.toString()}`);
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
