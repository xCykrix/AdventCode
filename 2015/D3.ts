import { BuiltInInputRegExpIdentifier } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';
import { StoreValue } from 'framework/lib/storage.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<boolean>();
    const x = ctf.storage.getStoredValue<number>(0);
    const y = ctf.storage.getStoredValue<number>(0);
    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.CHARACTERS)!;
    map.set(`0:0`, new StoreValue(true));

    for (const v of input) {
      switch (v) {
        case '^': {
          y.add(1);
          break;
        }
        case 'v': {
          y.subtract(1);
          break;
        }
        case '>': {
          x.add(1);
          break;
        }
        case '<': {
          x.subtract(1);
          break;
        }
      }

      map.set(`${x.get()}:${y.get()}`, new StoreValue(true));
    }

    return `${map.size}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<boolean>();
    const gate = ctf.storage.getStoredValue<boolean>(true);
    const sx = ctf.storage.getStoredValue<number>(0);
    const sy = ctf.storage.getStoredValue<number>(0);
    const rx = ctf.storage.getStoredValue<number>(0);
    const ry = ctf.storage.getStoredValue<number>(0);
    const input = CTFHelper.getInput().structured().from(import.meta.url).parse(BuiltInInputRegExpIdentifier.CHARACTERS)!;
    map.set(`0:0`, new StoreValue(true));

    for (const v of input) {
      switch (v) {
        case '^': {
          if (gate.get() === true) sy.add(1);
          else ry.add(1);
          break;
        }
        case 'v': {
          if (gate.get() === true) sy.subtract(1);
          else ry.subtract(1);
          break;
        }
        case '>': {
          if (gate.get() === true) sx.add(1);
          else rx.add(1);
          break;
        }
        case '<': {
          if (gate.get() === true) sx.subtract(1);
          else rx.subtract(1);
          break;
        }
      }

      map.set(gate.get() ? `${sx.get()}:${sy.get()}` : `${rx.get()}:${ry.get()}`, new StoreValue(true));
      gate.toggle();
    }

    return `${map.size}`;
  }
}

await CTF.do(new CTFExecute());
