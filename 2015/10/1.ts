import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.getValueStorage<string>(this.helper.getInput(InputType.STRING, '') as string);
  private cache = this.storage.getValueStorage<string>('');

  // Regular Expressions
  private parse = /(\d)\1*/g;

  override async evaluate(): Promise<void> {
    for (let i = 0; i < 40; i++) {
      const stored = this.store.getValueAsString()!;
      const match = stored.match(this.parse);
      for (const m of match!) {
        this.cache.value += m.length + m.split('')[0]!;
      }
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
