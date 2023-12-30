import { AOCBase } from '../../util/state.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    const defaultStorage = self.storage.getStorage('default', 0);
    const iterStorage = self.storage.getStorage('MEM1', 0);
    const resultStorage = self.storage.getStorage('output', '');

    b?.start();
    for (const v of this.inputAsSeparatedList[0]!) {
      if (v === '(') {
        defaultStorage.addInteger();
      }
      if (v === ')') {
        defaultStorage.subtractInteger();
      }

      iterStorage.addInteger();
      if (defaultStorage.get() < 0) {
        resultStorage.set(iterStorage.getAsString());
        break;
      }
    }
    b?.end();
  }
}
const aoc = new AOC('SEPARATED_LIST', '');
await aoc.execute();


// import { getInputAsSeparatedList } from '../../util/input.ts';
// import { info } from '../../util/log.ts';
// import { AOCNumberStorage } from '../../util/state.ts';

// const input = getInputAsSeparatedList('./input', '');
// const aoc = new AOCNumberStorage(0);
// const position = new AOCNumberStorage(0);


//   // Check the position.
//   position.add();
//   if (aoc.get() < 0) {
//     info("Basement Found:", position.getAsString());
//     break;
//   }
// }
