import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(0);

  // Factor Calculations to each house. Optimized to least number of iterations.
  // https://rosettacode.org/wiki/Factors_of_an_integer#JavaScript
  private calculate(house: number): number {
    const modulus: number[] = [1, house];

    // Start at 2 until the Sqrt of the house number.
    for (let i = 2; i <= Math.sqrt(house); i++) {
      if (house % i === 0) {
        modulus.push(i);
        if (i ** 2 !== house) modulus.push(house / i);
      }
    }

    // Reduce to additive sum and multiply by 10.
    return modulus.reduce((a, v) => a = a + v, 0) * 10;
  }

  override async evaluate(): Promise<void> {
    const v = parseInt(this.helper.getInput(InputType.STRING));

    // Iterate from 0 to the input.
    for (let i = 0; i < v; i++) {
      // Calculate the prime factors and sum them.
      const calculate = this.calculate(i);

      // If calculation * 10 >= input; result is found.
      if (calculate >= v) {
        this.store.set(i);
        break;
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.get()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
