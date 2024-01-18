import { BuiltInInputRegExpIdentifier } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { StoreValue } from 'framework/lib/storage.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();

    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<number>();
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/).parse(BuiltInInputRegExpIdentifier.EXPRESSION)!;

    for (const v of input) {
      const action = v[0] as 'turn on' | 'turn off' | 'toggle';
      const x1 = parseInt(v[1]!);
      const y1 = parseInt(v[2]!);
      const x2 = parseInt(v[3]!);
      const y2 = parseInt(v[4]!);

      for (let cx = x1; cx <= x2; cx++) {
        for (let cy = y1; cy <= y2; cy++) {
          if (!map.has(`${cx}:${cy}`)) map.set(`${cx}:${cy}`, new StoreValue(0));
          const ref = map.get(`${cx}:${cy}`)!;
          if (action === 'turn on') {
            ref.set(1);
          }
          if (action === 'turn off') {
            ref.set(0);
          }
          if (action === 'toggle') {
            if (ref.get() === 1) {
              ref.set(0);
            } else {
              ref.set(1);
            }
          }
        }
      }
    }

    return `${Array.from(map.values()).filter((v) => v.get() === 1).length}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<number>();
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/).parse(BuiltInInputRegExpIdentifier.EXPRESSION)!;

    for (const v of input) {
      const action = v[0] as 'turn on' | 'turn off' | 'toggle';
      const x1 = parseInt(v[1]!);
      const y1 = parseInt(v[2]!);
      const x2 = parseInt(v[3]!);
      const y2 = parseInt(v[4]!);

      for (let cx = x1; cx <= x2; cx++) {
        for (let cy = y1; cy <= y2; cy++) {
          if (!map.has(`${cx}:${cy}`)) map.set(`${cx}:${cy}`, new StoreValue(0));
          const ref = map.get(`${cx}:${cy}`)!;
          if (action === 'turn on') {
            ref.add(1);
          }
          if (action === 'turn off') {
            if (ref.get(0) <= 0) {
              ref.set(0);
              continue;
            }
            ref.subtract(1);
          }
          if (action === 'toggle') {
            ref.add(2);
          }
        }
      }
    }

    return `${Array.from(map.values()).reduce((a, v) => a + v.get(), 0)}`;
  }
}

await CTF.do(new CTFExecute());
