import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultCache = this.storage.getMapStorage<boolean>();

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
            defaultCache.set(`${cx}:${cy}`, new STValue(true));
          }
          if (action === 'turn off') {
            defaultCache.set(`${cx}:${cy}`, new STValue(false));
          }
          if (action === 'toggle') {
            if (defaultCache.has(`${cx}:${cy}`)) {
              const ref = defaultCache.get(`${cx}:${cy}`)!;
              ref.value = !ref.value;
            } else {
              defaultCache.set(`${cx}:${cy}`, new STValue(true));
            }
          }
        }
      }
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = Array.from(defaultCache.values()).filter(v => v.value === true).length.toString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
