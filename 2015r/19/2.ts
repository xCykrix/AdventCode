import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

let input =
  'CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(0);
  private cache = this.storage.makeStoredValue<string[][]>([]);

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, ' => ')) {
      // Process the input.
      const molecule = v[1]!;
      const update = v[0]!;

      // Write to storage.
      this.cache.get()?.push([molecule, update]);
    }

    while (true) {
      // Loop all cached values.
      for (const [molecule, replacement] of this.cache.get().values()) {
        const lookup = new RegExp(molecule!, 'g');
        const replace = new RegExp(molecule!);

        // Loop over all matches.
        let match: RegExpExecArray | null;
        while (true) {
          match = lookup.exec(input);
          if (match === null) break;
          input = input.slice(0, match.index) + input.slice(match.index).replace(replace, replacement!);
          this.store.add(1);
        }
      }
      if (input === 'e') break;
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.get()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
