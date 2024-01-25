import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';
import { StoreValue } from 'framework/lib/storage.ts';

import { permutations } from 'x/combinatorics@1.1.2/mod.ts';
import { Cursor } from 'framework/lib/helper/cursor.ts';

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<number>();
    const store = ctf.storage.getStoredValue(Infinity);
    const unique = new Set<string>();

    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*) to (.*) = (\d+)/).parse()!;

    for (const v of input) {
      const start = v[0]!;
      const end = v[1]!;
      const distance = parseInt(v[2]!);
      // Add start:end and end:start with distance.
      map.set(`${start}:${end}`, new StoreValue(distance));
      map.set(`${end}:${start}`, new StoreValue(distance));
      // Add unique list.
      unique.add(start);
      unique.add(end);
    }

    // Loop over brute force permutations.
    for (const permutation of permutations(Array.from(unique.values()))) {
      let distance = 0;
      const cursor = new Cursor(permutation);

      // Iterate the ArrayCursor.
      while (cursor.getNext() !== null) {
        const current = cursor.get();
        const next = cursor.getNext();
        cursor.step(1);
        if (next === null) break;

        // Add the Distance of the Next Step Lookup.
        distance += map.get(`${current}:${next}`)!.get();
      }

      // Store the Minimum Distance.
      store.set(Math.min(distance, store.get()));
    }

    return `${store.get()}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<number>();
    const store = ctf.storage.getStoredValue(0);
    const unique = new Set<string>();

    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*) to (.*) = (\d+)/).parse()!;

    for (const v of input) {
      const start = v[0]!;
      const end = v[1]!;
      const distance = parseInt(v[2]!);
      // Add start:end and end:start with distance.
      map.set(`${start}:${end}`, new StoreValue(distance));
      map.set(`${end}:${start}`, new StoreValue(distance));
      // Add unique list.
      unique.add(start);
      unique.add(end);
    }

    // Loop over brute force permutations.
    for (const permutation of permutations(Array.from(unique.values()))) {
      let distance = 0;
      const cursor = new Cursor(permutation);

      // Iterate the ArrayCursor.
      while (cursor.getNext() !== null) {
        const current = cursor.get();
        const next = cursor.getNext();
        cursor.step(1);
        if (next === null) break;

        // Add the Distance of the Next Step Lookup.
        distance += map.get(`${current}:${next}`)!.get();
      }

      // Store the Minimum Distance.
      store.set(Math.max(distance, store.get()));
    }

    return `${store.get()}`;
  }
}

await CTF.do(new CTFExecute());
