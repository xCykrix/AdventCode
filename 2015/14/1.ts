import { AOC, InputType, STValue } from '../../util/state.ts';

// Hardcoded Input: FlightDuration
const duration = 2503;

interface Reindeer {
  speed: number;
  maxDuration: number;
  restDuration: number;
  current: number;
  isResting: boolean;
}

class AOCDay extends AOC {
  private roster = this.storage.getMapStorage<Reindeer>();
  private distance = this.storage.getMapStorage<number>();
  private unique = new Set<string>();

  // Regular Expressions.
  private parse = /(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string[]) {
      // Parse the Input State.
      const matches = v.match(this.parse);
      const name = matches![1]!;
      const speed = parseInt(matches![2]!);
      const maxDuration = parseInt(matches![3]!);
      const restDuration = parseInt(matches![4]!);

      // Store to Roster.
      this.roster.set(
        name,
        new STValue({
          speed,
          maxDuration,
          restDuration,
          current: 0,
          isResting: false,
        }),
      );
      this.distance.set(name, new STValue(0));

      // Store Unique Names of Reindeer.
      this.unique.add(name);
    }

    // Run a for loop of each 'tick' of the game.
    for (let i = 0; i < duration; i++) {
      this.unique.forEach((name) => {
        const reindeer = this.roster.get(name)!.value!;
        if (!reindeer.isResting) {
          // Reindeer is active. Tick game and wait for sleep state.
          this.distance.addIntegerToValue(name, reindeer.speed);
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
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${Math.max(...(Array.from(this.distance.values()).map((value) => value.value!)))}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
