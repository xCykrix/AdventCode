import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

const input =
  'CRnSiRnCaPTiMgYCaPTiRnFArSiThFArCaSiThSiThPBCaCaSiRnSiRnTiTiMgArPBCaPMgYPTiRnFArFArCaSiRnBPMgArPRnCaPTiRnFArCaSiThCaCaFArPBCaCaPTiTiRnFArCaSiRnSiAlYSiThRnFArArCaSiRnBFArCaCaSiRnSiThCaCaCaFYCaPTiBCaSiThCaSiThPMgArSiRnCaPBFYCaCaFArCaCaCaCaSiThCaSiRnPRnFArPBSiThPRnFArSiRnMgArCaFYFArCaSiRnSiAlArTiTiTiTiTiTiTiRnPMgArPTiTiTiBSiRnSiAlArTiTiRnPMgArCaFYBPBPTiRnSiRnMgArSiThCaFArCaSiThFArPRnFArCaSiRnTiBSiThSiRnSiAlYCaFArPRnFArSiThCaFArCaCaSiThCaCaCaSiRnPRnCaFArFYPMgArCaPBCaPBSiRnFYPBCaFArCaSiAl';

class AOCDay extends AOC {
  private cache = this.storage.makeStoredValue<string[][]>([]);
  private unique = new Set<string>();

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.SEPARATED_LIST, ' => ')) {
      // Process the input.
      const molecule = v[0]!;
      const update = v[1]!;

      // Write to storage.
      this.cache.get()?.push([molecule, update]);
    }

    // Loop all cached values.
    for (const [molecule, replacement] of this.cache.get().values()) {
      const lookup = new RegExp(molecule!, 'g');
      const replace = new RegExp(molecule!);

      // Loop over all matches.
      let match: RegExpExecArray | null;
      while (true) {
        match = lookup.exec(input);
        if (match === null) break;
        this.unique.add(input.slice(0, match.index) + input.slice(match.index).replace(replace, replacement!));
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.unique.size}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
