import { BuiltInInputRegExpIdentifier } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

enum RegExpIdentifiers {
  LOOKUP_LOOK_SAY = 'D10_LOOKUP_LOOK_SAY',
}

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    CTFHelper.getRegularExpression().register(RegExpIdentifiers.LOOKUP_LOOK_SAY, /(\d)\1*/g);
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.STRING)!;
    const store = ctf.storage.getStoredValue(input);
    const expression = CTFHelper.getRegularExpression().clone(RegExpIdentifiers.LOOKUP_LOOK_SAY)!;

    for (let i = 0; i < 40; i++) {
      let cache = '';
      const stored = store.get().toString();
      const match = stored.match(expression);
      for (const m of match!) {
        cache += m.length + m.split('')[0]!;
      }
      store.set(cache);
    }

    return `${store.get()?.length}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.STRING)!;
    const store = ctf.storage.getStoredValue(input);
    const expression = CTFHelper.getRegularExpression().clone(RegExpIdentifiers.LOOKUP_LOOK_SAY)!;

    for (let i = 0; i < 50; i++) {
      let cache = '';
      const stored = store.get().toString();
      const match = stored.match(expression);
      for (const m of match!) {
        cache += m.length + m.split('')[0]!;
      }
      store.set(cache);
    }

    return `${store.get()?.length}`;
  }
}

await CTF.do(new CTFExecute());
