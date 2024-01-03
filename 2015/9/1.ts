import { InputCursor } from '../../util/input.ts';
import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<number>();
  private store = this.storage.getValueStorage<number>(Infinity);
  private unique = new Set<string>();

  // Regular Expressions
  private parse = /(.*) to (.*) = (\d+)/

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      const match = v.match(this.parse);
      const start = match![1]!;
      const end = match![2]!;
      const distance = parseInt(match![3]!);
      this.map.set(`${start}:${end}`, new STValue(distance));
      this.map.set(`${end}:${start}`, new STValue(distance));
      this.unique.add(start);
      this.unique.add(end);
    }

    const permutations = getPermutations(Array.from(this.unique.values()));
    for (const permutation of permutations) {
      let distance = 0;
      const cursor = new InputCursor(permutation);

      while(cursor.hasNext()) {
        const current = cursor.get();
        const next = cursor.getNext();
        cursor.stepPositionForwards(1);
        if (next === null) continue;

        distance += this.map.get(`${current}:${next}`)!.value!;
      }

      this.store.value = Math.min(distance, this.store.value!);
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${this.store.value}`;
  }
}

function getPermutations(inputArr: string[]): string[][] {
  const results: string[][] = [];

  function permute(arr: string[], memo: string[] = []): string[][] {
    let cur: string[];

    for (let i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]!);
    }

    return results;
  }

  return permute(inputArr);
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
