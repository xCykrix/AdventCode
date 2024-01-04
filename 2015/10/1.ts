import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.getValueStorage<string>(this.helper.getInput(InputType.STRING, '') as string);
  private cache = this.storage.getValueStorage<string>('');

  // Regular Expressions
  private parse = /(\d)\1*/g;

  override async evaluate(): Promise<void> {
    // Loop 40 Times.
    for (let i = 0; i < 40; i++) {
      const stored = this.store.getValueAsString()!;

      // Take global regex matches of groups of numbers.
      const match = stored.match(this.parse);
      // Process the length of the matches and concat the length + original number.
      for (const m of match!) {
        this.cache.value += m.length + m.split('')[0]!;
      }
      // Store value and reset cache.
      this.store.value = this.cache.value;
      this.cache.value = '';
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${this.store.value!.length}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
