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
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(\d+)x(\d+)x(\d+)/).parse()!;

    for (const v of input) {
      const [l, w, h] = [
        parseInt(v[0]!),
        parseInt(v[1]!),
        parseInt(v[2]!),
      ];

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
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(\d+)x(\d+)x(\d+)/).parse()!;

    for (const v of input) {
      const [l, w, h] = [
        parseInt(v[0]!),
        parseInt(v[1]!),
        parseInt(v[2]!),
      ];

      // Sort the shortest sides.
      const ordered = [l!, w!, h!].sort((a, b) => a - b);

      // Add to result.
      store.add((ordered[0]! + ordered[0]! + ordered[1]! + ordered[1]!) + (l! * w! * h!));
    }

    return `${store.get()}`;
  }
}

await CTF.do(new CTFExecute());
