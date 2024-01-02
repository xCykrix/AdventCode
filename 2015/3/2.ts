import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultMap = this.storage.getMapStorage<number>();

    // Current Coordinates
    const step = this.storage.getValueStorage<boolean>(true);
    const sx = this.storage.getValueStorage<number>(0);
    const sy = this.storage.getValueStorage<number>(0);
    const rx = this.storage.getValueStorage<number>(0);
    const ry = this.storage.getValueStorage<number>(0);

    // Load 0:0 to Cache
    defaultMap.set(`0:0`, new STValue<number>(1));

    // Start of AOC
    for (const v of this.helper.getInput(InputType.SEPARATED_STRING, '')) {
      switch (v) {
        case '^': {
          if (step.value === true) sy.addNumberToValue(1)
          else ry.addNumberToValue(1);
          break;
        }
        case 'v': {
          if (step.value === true) sy.subtractNumberFromValue(1)
          else ry.subtractNumberFromValue(1);
          break;
        }
        case '>': {
          if (step.value === true) sx.addNumberToValue(1)
          else rx.addNumberToValue(1);
          break;
        }
        case '<': {
          if (step.value === true) sx.subtractNumberFromValue(1)
          else rx.subtractNumberFromValue(1);
          break;
        }
      }

      defaultMap.addIntegerToValue(step.value ? `${sx}:${sy}` : `${rx}:${ry}`, 1);
      step.value = !step.value;
    }

    // Store Result of AOC.
    this.storage.getValueStorage(0, 'value').value = defaultMap.size;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();


// import { AOCBase } from '../../util/state.ts';

// class AOC extends AOCBase {
//   override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
//     // Load the State. This includes preparing memory and reading from disk.
//     const defaultCache = self.storage.getCache('default');
//     const resultStorage = self.storage.getStorage('output', '');

//     // Add Default Cache
//     defaultCache.setValue('0:0', 0);
//     let robotSantaTurn = false;
//     let ax = 0;
//     let ay = 0;
//     let bx = 0;
//     let by = 0;

//     // Execute AOC and Benchmarks (if applicable).
//     b?.start();
//     for (const v of this.inputAsSeparatedList[0]!) {
//       // Process the input.
//       switch(v) {
//         case '^': {
//           if (!robotSantaTurn) ay = ay + 1;
//           else by = by + 1;
//           break;
//         }
//         case 'v': {
//           if (!robotSantaTurn) ay = ay - 1;
//           else by = by - 1;
//           break;
//         }
//         case '>': {
//           if (!robotSantaTurn) ax = ax + 1;
//           else bx = bx + 1;
//           break;
//         }
//         case '<': {
//           if (!robotSantaTurn) ax = ax - 1;
//           else bx = bx - 1;
//           break;
//         }
//       }

//       if (!robotSantaTurn) {
//         defaultCache.addIntegerToValue(`${ax}:${ay}`, 1);
//         robotSantaTurn = true;
//         continue;
//       } else {
//         defaultCache.addIntegerToValue(`${bx}:${by}`, 1);
//         robotSantaTurn = false;
//         continue;
//       }
//     }
//     b?.end();

//     // Store Result.
//     resultStorage.set(`${defaultCache.getSize()}`);
//   }
// }

// // Execute AOC.
// const aoc = new AOC('SEPARATED_LIST', '');
// await aoc.execute();
