import { BuiltInInputRegExpIdentifier } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const len1 = ctf.storage.getStoredValue<number>(0);
    const len2 = ctf.storage.getStoredValue<number>(0);

    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.LIST)!;

    for (const v of input) {
      len1.add(v.length);
      len2.add(JSON.parse(v.replace(/\\x([a-f\d]{2})/g, '\\u00$1')).length);
    }

    return `${len1.get() - len2.get()}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.LIST)!;

    for (const v of input) {
    }

    return `${store.get()}`;
  }
}

await CTF.do(new CTFExecute());
