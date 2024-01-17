import { ListInputType } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { StoreValue } from 'framework/lib/storage.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

enum RegExpIdentifiers {
  PARSE_INPUT = 'PARSE_INPUT',
}

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();

    CTFHelper.getRegularExpression().register(RegExpIdentifiers.PARSE_INPUT, /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);

    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<number>();
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('').getList(ListInputType.LIST)!;

    for (const v of input) {
      const match = v.match(CTFHelper.getRegularExpression().get(RegExpIdentifiers.PARSE_INPUT)!)!;
      const action = match[1]! as 'turn on' | 'turn off' | 'toggle';
      const x1 = parseInt(match[2]!);
      const y1 = parseInt(match[3]!);
      const x2 = parseInt(match[4]!);
      const y2 = parseInt(match[5]!);

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
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('').getList(ListInputType.LIST)!;

    for (const v of input) {
      const match = v.match(CTFHelper.getRegularExpression().get(RegExpIdentifiers.PARSE_INPUT)!)!;
      const action = match[1]! as 'turn on' | 'turn off' | 'toggle';
      const x1 = parseInt(match[2]!);
      const y1 = parseInt(match[3]!);
      const x2 = parseInt(match[4]!);
      const y2 = parseInt(match[5]!);

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
