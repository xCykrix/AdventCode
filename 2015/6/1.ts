import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<boolean>();

  // Regular Expressions
  private parse = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      // Parse Light Update State.
      let [action, x1, y1, x2, y2] = ['off', 0, 0, 0, 0];
      const match = v.match(this.parse);
      action = match![1]!;
      x1 = parseInt(match![2]!);
      y1 = parseInt(match![3]!);
      x2 = parseInt(match![4]!);
      y2 = parseInt(match![5]!);

      // Iterate over the 2d Plane and Update lights.
      for (let cx = x1; cx <= x2; cx++) {
        for (let cy = y1; cy <= y2; cy++) {
          if (action === 'turn on') {
            this.map.set(`${cx}:${cy}`, new STValue(true));
          }
          if (action === 'turn off') {
            this.map.set(`${cx}:${cy}`, new STValue(false));
          }
          if (action === 'toggle') {
            if (this.map.has(`${cx}:${cy}`)) {
              const ref = this.map.get(`${cx}:${cy}`)!;
              ref.value = !ref.value;
            } else {
              this.map.set(`${cx}:${cy}`, new STValue(true));
            }
          }
        }
      }
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = Array.from(this.map.values()).filter((v) => v.value === true).length.toString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
