import { ListInputType } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('x').getList(ListInputType.SEPARATED_LIST)!;

    for (const v of input) {
      const [l, w, h] = getVars(v);

      // Calculate the side.
      const lw = l! * w!;
      const wh = w! * h!;
      const hl = h! * l!;

      // Sort the shortest sides.
      const ordered = Math.min(...[lw, wh, hl]);

      // Add to result.
      store.add(ordered + ((2 * lw) + (2 * wh) + (2 * hl)));
    }

    return `${store.get()}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = CTFHelper.getInput().structured().with(import.meta.url).separate('x').getList(ListInputType.SEPARATED_LIST)!;

    for (const v of input) {
      const [l, w, h] = getVars(v);

      // Sort the shortest sides.
      const ordered = [l!, w!, h!].sort((a, b) => a - b);

      // Add to result.
      store.add((ordered[0]! + ordered[0]! + ordered[1]! + ordered[1]!) + (l! * w! * h!));
    }

    return `${store.get()}`;
  }
}

function getVars(v: string[]): number[] {
  return [
    parseInt(v[0]!),
    parseInt(v[1]!),
    parseInt(v[2]!),
  ];
}

await CTF.do(new CTFExecute());
