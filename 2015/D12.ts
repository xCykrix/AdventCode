import { BuiltInInputRegExpIdentifier } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(_ctf: CTFFramework): Promise<string> {
    return `${
      Static.count(
        JSON.parse(
          CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.STRING)!,
        ),
        false,
      )
    }`;
  }

  private async P2(_ctf: CTFFramework): Promise<string> {
    return `${
      Static.count(
        JSON.parse(
          CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.STRING)!,
        ),
        true,
      )
    }`;
  }
}

class Static {
  public static count(object: Record<string, unknown>, p2 = false): number {
    let identifiers: unknown[] = [];

    // Check if the object is an array or object.
    if (Array.isArray(object)) {
      identifiers = object;
    } else {
      identifiers = Object.keys(object).map((k) => object[k]);
      if (p2 && identifiers.includes('red')) return 0;
    }

    // Map the identifiers to objects or numbers. Recurse objects.
    let a = 0;
    identifiers.map((v) => {
      let value = 0;
      if (typeof v === 'number') {
        value = v;
      }
      if (typeof v === 'object') {
        value = this.count(v as Record<string, unknown>, p2);
      }
      a = a + value;
    });

    return a;
  }
}

await CTF.do(new CTFExecute());
