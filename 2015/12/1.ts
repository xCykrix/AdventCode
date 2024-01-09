import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private count(object: Record<string, unknown>): number {
    let identifiers: unknown[] = [];

    // Check if the object is an array or object.
    if (Array.isArray(object)) {
      identifiers = object;
    } else {
      identifiers = Object.keys(object).map((k) => object[k]);
    }

    // Map the identifiers to objects or numbers. Recurse objects.
    // TODO(@xCykrix): This could also be done in a reduce function.
    let a = 0;
    identifiers.map((v) => {
      let value = 0;
      if (typeof v === 'number') {
        value = v;
      }
      if (typeof v === 'object') {
        value = this.count(v as Record<string, unknown>);
      }
      a = a + value;
    });

    return a;
  }

  override async evaluate(): Promise<void> {
    // Process the input.
    const v = this.helper.getInput(InputType.STRING);

    // Parse to JSON and Count Numbers.
    const parse = JSON.parse(v);
    const count = this.count(parse);

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${count}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
