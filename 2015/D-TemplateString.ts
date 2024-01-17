import { StringInputType } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = ctf.helpers.getInput().structured().with(import.meta.url).separate('').getString(StringInputType.SEPARATED_STRING)!;

    for (const v of input) {
    }

    return `${store.get()}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = ctf.helpers.getInput().structured().with(import.meta.url).separate('').getString(StringInputType.SEPARATED_STRING)!;

    for (const v of input) {
    }

    return `${store.get()}`;
  }
}

await CTF.do(new CTFExecute());
