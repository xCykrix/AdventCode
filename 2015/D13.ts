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
    const store = ctf.storage.getStoredValue(0);
    const unique = new Set<string>();
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*) would (gain|lose) (\d+) happiness units by sitting next to (.*)./).parse()!;

    for (const v of input) {
      const p1 = v[0]!;
      const p2 = v[3]!;
      const action = v[1]!;
      const happiness = parseInt(v[2]!) * (action === 'gain' ? 1 : -1);

      // Set Happiness
      map.set(`${p1}:${p2}`, new StoreValue(happiness));

      // Add Unique
      unique.add(p1);
      unique.add(p2);
    }

    // Permutations
    for (const permutation of permutations(Array.from(unique.values()))) {
      let happiness = 0;
      const cursor = new Cursor([...permutation, ':']);

      // Iterate the cursor.
      while (cursor.getNext() !== null) {
        const start = cursor.getAt(0);
        const current = cursor.get();
        let next = cursor.getNext();
        cursor.step(1);

        // Loop around to beginning from the end to get last change.
        if (next === ':') {
          next = start;
        }

        // Add Happiness Changes of Current and Next Person. Last person uses first position.
        happiness += (map.get(`${current}:${next}`)?.get()) ?? 0;
        happiness += (map.get(`${next}:${current}`)?.get()) ?? 0;
      }

      // Store max happiness.
      store.set(Math.max(happiness, store.get()));
    }

    return `${store.get()}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const map = ctf.storage.getStoredMap<number>();
    const store = ctf.storage.getStoredValue(0);
    const unique = new Set<string>();
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*) would (gain|lose) (\d+) happiness units by sitting next to (.*)./).parse()!;

    for (const v of input) {
      const p1 = v[0]!;
      const p2 = v[3]!;
      const action = v[1]!;
      const happiness = parseInt(v[2]!) * (action === 'gain' ? 1 : -1);

      // Set Happiness
      map.set(`${p1}:${p2}`, new StoreValue(happiness));

      // Add Unique
      unique.add(p1);
      unique.add(p2);
    }
    unique.add('X');

    // Permutations
    for (const permutation of permutations(Array.from(unique.values()))) {
      let happiness = 0;
      const cursor = new Cursor([...permutation, ':']);

      // Iterate the cursor.
      while (cursor.getNext() !== null) {
        const start = cursor.getAt(0);
        const current = cursor.get();
        let next = cursor.getNext();
        cursor.step(1);

        // Loop around to beginning from the end to get last change.
        if (next === ':') {
          next = start;
        }

        // Add Happiness Changes of Current and Next Person. Last person uses first position.
        happiness += (map.get(`${current}:${next}`)?.get()) ?? 0;
        happiness += (map.get(`${next}:${current}`)?.get()) ?? 0;
      }

      // Store max happiness.
      store.set(Math.max(happiness, store.get()));
    }

    return `${store.get()}`;
  }
}

await CTF.do(new CTFExecute());
