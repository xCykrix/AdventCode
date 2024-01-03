import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  private store = this.storage.getValueStorage<string>(this.helper.getInput(InputType.STRING, '') as string);
  private cache = this.storage.getValueStorage<string>('');

  // Regular Expressions
  private parse = /(\d)\1*/g;

  override async evaluate(): Promise<void> {


    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${this.store.value!.length}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
