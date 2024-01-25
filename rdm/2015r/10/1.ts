import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<string>('');
  private cache = this.storage.makeStoredValue<string>('');

  // Regular Expressions
  private parse = /(\d)\1*/g;

  override async evaluate(): Promise<void> {
    this.store.set(this.helper.getInput(InputType.STRING));

    // Loop 40 Times.
    for (let i = 0; i < 40; i++) {
      const stored = this.store.toString()!;

      // Take global regex matches of groups of numbers.
      const match = stored.match(this.parse);
      // Process the length of the matches and concat the length + original number.
      for (const m of match!) {
        this.cache.set(this.store.get() + m.length + m.split('')[0]!);
      }
      // Store value and reset cache.
      this.store.get = this.cache.get;
      this.cache.set('');
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.get!.length}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
