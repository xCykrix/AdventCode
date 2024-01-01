import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultStorage = this.storage.getValueStorage<number>(0);

    // Start of AOC
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, 'x')) {
      // Process the input.
      const l = parseInt(v[0]!);
      const w = parseInt(v[1]!);
      const h = parseInt(v[2]!);

      // Sort the shortest sides.
      const ordered = [l, w, h].sort((a, b) => a - b);

      // Add to result.
      defaultStorage.addNumberToValue((ordered[0]! + ordered[0]! + ordered[1]! + ordered[1]!) + (l * w * h));
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = defaultStorage.getValueAsString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
