import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';
import { StoreValue } from 'framework/lib/storage.ts';

// Hardcoded Input: FlightDuration
const ticks = 2503;

// Interface
interface Reindeer {
  name: string;
  speed: number;
  duration: number;
  rest: number;
  current: number;
  distance: number;
  isResting: boolean;
}

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const roster = ctf.storage.getStoredMap<Reindeer>();
    const distance = ctf.storage.getStoredMap<number>();
    const unique = new Set<string>();
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./).parse()!;

    for (const v of input) {
      const name = v[0]!;
      const speed = parseInt(v[1]!);
      const duration = parseInt(v[2]!);
      const rest = parseInt(v[3]!);

      roster.set(
        name,
        new StoreValue({
          name,
          speed,
          duration,
          rest,
          current: 0,
          distance: 0,
          isResting: false,
        }),
      );
      distance.set(name, new StoreValue(0));
      unique.add(name);
    }

    for (let i = 0; i < ticks; i++) {
      unique.forEach((v) => {
        const reindeer = roster.get(v)!.get();
        if (!reindeer.isResting) {
          // Reindeer is active. Tick game and wait for sleep state.
          distance.add(v, reindeer.speed);
          reindeer.current += 1;
          if (reindeer.current >= reindeer.duration) {
            reindeer.current = 0;
            reindeer.isResting = true;
          }
        } else {
          // Reindeer is sleeping. Tick game and wait for active state.
          reindeer.current += 1;
          if (reindeer.current >= reindeer.rest) {
            reindeer.current = 0;
            reindeer.isResting = false;
          }
        }
      });
    }

    return `${Math.max(...(Array.from(distance.values()).map((value) => value.get())))}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const roster = ctf.storage.getStoredMap<Reindeer>();
    const distance = ctf.storage.getStoredMap<number>();
    const points = ctf.storage.getStoredMap<number>();
    const unique = new Set<string>();
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./).parse()!;

    for (const v of input) {
      const name = v[0]!;
      const speed = parseInt(v[1]!);
      const duration = parseInt(v[2]!);
      const rest = parseInt(v[3]!);

      roster.set(
        name,
        new StoreValue({
          name,
          speed,
          duration,
          rest,
          current: 0,
          distance: 0,
          isResting: false,
        }),
      );
      distance.set(name, new StoreValue(0));
      unique.add(name);
    }

    for (let i = 0; i < ticks; i++) {
      unique.forEach((v) => {
        const reindeer = roster.get(v)!.get();
        if (!reindeer.isResting) {
          // Reindeer is active. Tick game and wait for sleep state.
          distance.add(v, reindeer.speed);
          reindeer.distance = distance.get(v)!.get();
          reindeer.current += 1;
          if (reindeer.current >= reindeer.duration) {
            reindeer.current = 0;
            reindeer.isResting = true;
          }
        } else {
          // Reindeer is sleeping. Tick game and wait for active state.
          reindeer.current += 1;
          if (reindeer.current >= reindeer.rest) {
            reindeer.current = 0;
            reindeer.isResting = false;
          }
        }
      });

      points.add(Array.from(roster.values()).reduce((max, current) => max.get().distance > current.get().distance ? max : current).get().name, 1);
    }

    return `${Math.max(...(Array.from(points.values()).map((value) => value.get())))}`;
  }
}

await CTF.do(new CTFExecute());
