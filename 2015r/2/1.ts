import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, 'x')) {
      // Process the input.
      const l = parseInt(v[0]!);
      const w = parseInt(v[1]!);
      const h = parseInt(v[2]!);

      // Calculate the side.
      const lw = l * w;
      const wh = w * h;
      const hl = h * l;

      // Sort the shortest sides.
      const ordered = Math.min(...[lw, wh, hl]);

      // Add to result.
      this.store.add(ordered + ((2 * lw) + (2 * wh) + (2 * hl)));
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(this.store.toString());
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
