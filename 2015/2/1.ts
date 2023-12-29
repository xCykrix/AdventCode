import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultStorage = self.storage.getStorage('default', 0);
    const resultStorage = self.storage.getStorage('output', '');

    // Execute AOC and Benchmarks (if applicable).
    b?.start();
    for (const v of this.inputAsSeparatedList!) {
      // Process the input.
      const l = parseInt(v[0]!);
      const w = parseInt(v[1]!);
      const h = parseInt(v[2]!);

      // Calculate the side.
      const lw = l * w;
      const wh = w * h;
      const hl = h * l;

      // Sort the shortest sides.
      const ordered = [lw, wh, hl].sort((a, b) => a - b);

      // Add to result.
      defaultStorage.addInteger(ordered[0]! + ((2 * lw) + (2 * wh) + (2 * hl)));
    }
    b?.end();

    // Store Result.
    resultStorage.set(defaultStorage.getAsString());
  }
}

// Execute AOC.
const aoc = new AOC('SEPARATED_LIST', 'x');
await aoc.execute();
