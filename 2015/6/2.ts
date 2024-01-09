import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.makeStoredMap<number>();

  // Regular Expressions
  private parse = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '')) {
      // Process the input.
      let [action, x1, y1, x2, y2] = ['off', 0, 0, 0, 0];
      const match = v.match(this.parse);
      action = match![1]!;
      x1 = parseInt(match![2]!);
      y1 = parseInt(match![3]!);
      x2 = parseInt(match![4]!);
      y2 = parseInt(match![5]!);

      // Iterate over the 2d Plane and Update Lights.
      for (let cx = x1; cx <= x2; cx++) {
        for (let cy = y1; cy <= y2; cy++) {
          if (action === 'turn on') {
            this.map.addIntegerToValue(`${cx}:${cy}`, 1);
          }
          if (action === 'turn off') {
            if ((this.map.get(`${cx}:${cy}`)?.get() ?? 0) <= 0) continue;
            this.map.subtractIntegerFromValue(`${cx}:${cy}`, 1);
          }
          if (action === 'toggle') {
            this.map.addIntegerToValue(`${cx}:${cy}`, 2);
          }
        }
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(
      `${Array.from(this.map.values()).reduce((a, v) => a + v.get(), 0)}`,
    );
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
