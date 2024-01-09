import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

// Hardcoded Input: FlightDuration
const duration = 2503;

interface Reindeer {
  name: string;
  speed: number;
  maxDuration: number;
  restDuration: number;
  current: number;
  distance: number;
  isResting: boolean;
}

class AOCDay extends AOC {
  private roster = this.storage.makeStoredMap<Reindeer>();
  private distance = this.storage.makeStoredMap<number>();
  private points = this.storage.makeStoredMap<number>();
  private unique = new Set<string>();

  // Regular Expressions.
  private parse = /(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST)) {
      // Process the input.
      const matches = v.match(this.parse);
      const name = matches![1]!;
      const speed = parseInt(matches![2]!);
      const maxDuration = parseInt(matches![3]!);
      const restDuration = parseInt(matches![4]!);

      // Store to Roster.
      this.roster.set(
        name,
        new StoreValue({
          name,
          speed,
          maxDuration,
          restDuration,
          current: 0,
          distance: 0,
          isResting: false,
        }),
      );
      this.distance.set(name, new StoreValue(0));

      // Store Unique Names of Reindeer.
      this.unique.add(name);
    }

    // Run a for loop of each 'tick' of the game.
    for (let i = 0; i < duration; i++) {
      this.unique.forEach((name) => {
        const reindeer = this.roster.get(name)!.get();
        if (!reindeer.isResting) {
          // Reindeer is active. Tick game and wait for sleep state.
          this.distance.addIntegerToValue(name, reindeer.speed);
          reindeer.distance = this.distance.get(name)!.get();
          reindeer.current += 1;
          if (reindeer.current >= reindeer.maxDuration) {
            reindeer.current = 0;
            reindeer.isResting = true;
          }
        } else {
          // Reindeer is sleeping. Tick game and wait for active state.
          reindeer.current += 1;
          if (reindeer.current >= reindeer.restDuration) {
            reindeer.current = 0;
            reindeer.isResting = false;
          }
        }
      });

      // Add points of current leader after all ticks.
      this.points.addIntegerToValue(Array.from(this.roster.values()).reduce((max, current) => max.get().distance > current.get().distance ? max : current).get().name, 1);
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${Math.max(...(Array.from(this.points.values()).map((value) => value.get())))}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
