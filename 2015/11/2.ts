import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

class AOCDay extends AOC {
  // Regular Expressions
  private restricted = /i|o|l/;
  private pairs = /(\w)\1.*(\w)\2/;
  private increment = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/;

  private charTick(char: string): string {
    // Wrap Z to A in a quick return.
    if (char === 'z') return 'a';
    // Add +1 to character code and return.
    return String.fromCharCode(char.charCodeAt(0) + 1);
  }

  private stringTick(value: string): string {
    // Get current character at end of string. Tick the character.
    const next = this.charTick(value.slice(-1));

    if (next === 'a') {
      // If character is a, add to the end of the string and tick to the left.
      return this.stringTick(value.slice(0, -1)) + 'a';
    } else {
      // If character is b-z, return the string.
      return value.slice(0, -1) + next;
    }
  }

  private valid(value: string): boolean {
    if (this.restricted.test(value)) return false;
    if (!this.pairs.test(value)) return false;
    if (!this.increment.test(value)) return false;
    return true;
  }

  override async evaluate(): Promise<void> {
    // Process the input.
    let v = this.helper.getInput(InputType.STRING);

    // If the last attempt was not valid, loop indefinitely.
    while (!this.valid(v)) {
      // Brute-force the password with all combinations. Increments letters of string.
      v = this.stringTick(v);
    }
    // Tick to next invalid to find 2nd password.
    v = this.stringTick(v);

    // Password Expired. Redo above to find next password.
    while (!this.valid(v)) {
      v = this.stringTick(v);
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${v}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
