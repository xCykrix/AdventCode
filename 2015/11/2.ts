import { AOC, InputType } from '../../util/state.ts';

class AOCDay extends AOC {
  // Regular Expressions
  private restricted = /i|o|l/;
  private pairs = /(\w)\1.*(\w)\2/;
  private increment = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/;

  private charTick(char: string): string {
    if (char === 'z') return 'a';
    return String.fromCharCode(char.charCodeAt(0) + 1);
  }

  private stringTick(value: string): string {
    const next = this.charTick(value.slice(-1));
    if (next === 'a') {
      return this.stringTick(value.slice(0, -1)) + 'a';
    } else {
      return value.slice(0, -1) + next;
    }
  }

  private valid(value: string): boolean {
    if (this.restricted.test(value)) return false;
    if (!this.pairs.test(value)) return false;
    if (!this.increment.test(value)) return false
    return true;
  }

  override async evaluate(): Promise<void> {
    let v = this.helper.getInput(InputType.STRING, '') as string;

    // Dynamically Calculate First Password
    while (!this.valid(v)) {
      v = this.stringTick(v);
    }
    v = this.stringTick(v);

    // Expired Again Password Password
    while (!this.valid(v)) {
      v = this.stringTick(v);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${v}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
