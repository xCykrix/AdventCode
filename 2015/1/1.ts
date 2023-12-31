import { AOC, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultStorage = this.storage.getValueStorage<number>()!;

    // Start of AOC
    defaultStorage.value = 1;

    // End of AOC
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();

// import { AOCBase } from '../../util/state.ts';

// class AOC extends AOCBase {
//   override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
//     // Load the State. This includes preparing memory and reading from disk.
//     const defaultStorage = self.storage.getStorage('default', 0);
//     const resultStorage = self.storage.getStorage('output', '');

//     // Execute AOC and Benchmarks (if applicable).
//     b?.start();
//     for (const v of this.inputAsSeparatedList[0]!) {
//       if (v === '(') {
//         defaultStorage.addInteger();
//       }
//       if (v === ')') {
//         defaultStorage.subtractInteger();
//       }
//     }
//     b?.end();

//     // Store Result.
//     resultStorage.set(defaultStorage.getAsString());
//   }
// }


