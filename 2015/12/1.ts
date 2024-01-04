import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.getValueStorage<number>(0);

  private count(object: Record<string, unknown>): number {
    let identifiers: unknown[] = [];
    if (Array.isArray(object)) {
      identifiers = object;
    } else {
      identifiers = Object.keys(object).map(k => object[k]);
    }

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
    const v = this.helper.getInput(InputType.STRING, '') as string;
    const parse = JSON.parse(v);

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${this.count(parse)}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
