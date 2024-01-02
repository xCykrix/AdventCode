import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultCache = this.storage.getMapStorage<number>();

    // Define Regular Expressions
    const parseCommand = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/

    // Start of AOC
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      let [action, x1, y1, x2, y2] = ['off', 0, 0, 0, 0];
      const match = v.match(parseCommand);
      action = match![1]!;
      x1 = parseInt(match![2]!);
      y1 = parseInt(match![3]!);
      x2 = parseInt(match![4]!);
      y2 = parseInt(match![5]!);

      for (let cx = x1; cx <= x2; cx++) {
        for (let cy = y1; cy <= y2; cy++) {
          if (action === 'turn on') {
            defaultCache.addIntegerToValue(`${cx}:${cy}`, 1);
          }
          if (action === 'turn off') {
            if ((defaultCache.get(`${cx}:${cy}`)?.value ?? 0) <= 0) continue;
            defaultCache.subtractIntegerFromValue(`${cx}:${cy}`, 1);
          }
          if (action === 'toggle') {
            defaultCache.addIntegerToValue(`${cx}:${cy}`, 2);
          }
        }
      }
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = Array.from(defaultCache.values()).reduce((a, v) => a + v.value!, 0).toString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
