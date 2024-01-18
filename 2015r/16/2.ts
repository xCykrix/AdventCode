import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

interface AuntSue {
  children: number | null;
  cats: number | null;
  samoyeds: number | null;
  pomeranians: number | null;
  akitas: number | null;
  vizslas: number | null;
  goldfish: number | null;
  trees: number | null;
  cars: number | null;
  perfumes: number | null;
  [key: string]: number | null;
}

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<string>('Unknown');

  // Regular Expressions.
  private parse = /Sue (\d+): (\w+: \d+), (\w+: \d+), (\w+: \d+)/;

  // Fingerprint of Real Sue
  private fingerprint: AuntSue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST)) {
      // Process the input.
      const matches = v.match(this.parse);
      const id = matches!.slice(1, 2)[0];
      const sue: Partial<AuntSue> = {};

      // Parse the Partial Sue.
      for (const match of matches!.slice(2, matches!.length)) {
        const split = match.split(': ');
        sue[split[0]!] = parseInt(split[1]!);
      }

      // Check if all properties of Partial Sue match a Real Sue.
      let same = true;
      for (const k of Object.keys(sue)) {
        // Override operation on 'cats' and 'trees'.
        if (k === 'cats' || k === 'trees') {
          same = sue[k]! > this.fingerprint[k]!;
        } // Override operation on 'pomeranians' and 'goldfish'.
        else if (k === 'pomeranians' || k === 'goldfish') {
          same = sue[k]! < this.fingerprint[k]!;
        } else {
          same = sue[k] === this.fingerprint[k]!;
        }
        if (same === false) break;
      }

      // If Real Sue is found, save id and break.
      if (same) {
        this.store.set(`${id}`);
        break;
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.toString()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
