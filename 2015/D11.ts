import { BuiltInInputRegExpIdentifier } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

enum RegExpIdentifiers {
  RESTRICTED = 'D11_RESTRICTED',
  PAIRS = 'D11_PAIRS',
  INCREMENTS = 'D11_INCREMENTS',
}

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    CTFHelper.getRegularExpression().register(RegExpIdentifiers.RESTRICTED, /i|o|l/);
    CTFHelper.getRegularExpression().register(RegExpIdentifiers.PAIRS, /(\w)\1.*(\w)\2/);
    CTFHelper.getRegularExpression().register(RegExpIdentifiers.INCREMENTS, /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/);
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(_ctf: CTFFramework): Promise<string> {
    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.STRING)!;

    let v = input;
    while (!Static.valid(v)) {
      v = Static.tick(v);
    }

    return `${v}`;
  }

  private async P2(_ctf: CTFFramework): Promise<string> {
    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.STRING)!;

    let v = input;
    while (!Static.valid(v)) {
      v = Static.tick(v);
    }
    v = Static.tick(v);

    while (!Static.valid(v)) {
      v = Static.tick(v);
    }

    return `${v}`;
  }
}

class Static {
  public static valid(value: string): boolean {
    if (CTFHelper.getRegularExpression().get(RegExpIdentifiers.RESTRICTED)!.test(value)) return false;
    if (!CTFHelper.getRegularExpression().get(RegExpIdentifiers.PAIRS)!.test(value)) return false;
    if (!CTFHelper.getRegularExpression().get(RegExpIdentifiers.INCREMENTS)!.test(value)) return false;
    return true;
  }

  public static tick(value: string): string {
    // Get current character at end of string. Tick the character.
    const next = this.character(value.slice(-1));

    if (next === 'a') {
      // If character is a, add to the end of the string and tick to the left.
      return this.tick(value.slice(0, -1)) + 'a';
    } else {
      // If character is b-z, return the string.
      return value.slice(0, -1) + next;
    }
  }

  private static character(char: string): string {
    // Wrap Z to A in a quick return.
    if (char === 'z') return 'a';
    // Add +1 to character code and return.
    return String.fromCharCode(char.charCodeAt(0) + 1);
  }
}

await CTF.do(new CTFExecute());
