import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<boolean>();
  private updates: [string, STValue<boolean>][] = [];

  private getNextState(x: number, y: number): number {
    const search = [
      this.map.get(`${x - 1}:${y - 1}`)?.value ?? false,
      this.map.get(`${x}:${y - 1}`)?.value ?? false,
      this.map.get(`${x + 1}:${y - 1}`)?.value ?? false,
      this.map.get(`${x + 1}:${y}`)?.value ?? false,
      this.map.get(`${x + 1}:${y + 1}`)?.value ?? false,
      this.map.get(`${x}:${y + 1}`)?.value ?? false,
      this.map.get(`${x - 1}:${y + 1}`)?.value ?? false,
      this.map.get(`${x - 1}:${y}`)?.value ?? false,
    ]
    let on = 0;
    search.forEach((v) => {
      if (v) on++;
    })
    return on;
  }

  override async evaluate(): Promise<void> {
    let y = 0;
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, '') as string[]) {
      let x = 0;
      for (const state of v) {
        this.map.set(`${x}:${y}`, new STValue((state === "#") ? true : false));
        x++;
      }
      y++;
    }

    for (let i = 0; i < 100; i++) {
      let updates: [string, boolean][] = [];
      for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 100; x++) {
          const current = this.map.get(`${x}:${y}`)!.value;
          const next = this.getNextState(x, y) + (current === true ? 1 : 0);
          if (current === true) {
            if (next === 2 || next === 3) {
              updates.push([`${x}:${y}`, true]);
            } else {
              updates.push([`${x}:${y}`, false]);
            }
          } else {
            if (next === 3) {
              updates.push([`${x}:${y}`, true]);
            } else {
              updates.push([`${x}:${y}`, false]);
            }
          }
        }
      }
      for (const update of updates) {
        this.map.set(update[0], new STValue(update[1]));
      }
      updates = [];
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = Array.from(this.map.values()).filter((v) => v.value === true).length.toString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
