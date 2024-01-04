import { InputCursor } from '../../util/input.ts';
import { AOC, InputType, STValue } from '../../util/state.ts';

class AOCDay extends AOC {
  private map = this.storage.getMapStorage<number>();
  private store = this.storage.getValueStorage<number>(0);
  private unique = new Set<string>();

  // Regular Expressions
  private parse = /(.*) would (gain|lose) (\d+) happiness units by sitting next to (.*)./

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string) {
      const match = v.match(this.parse);
      const person1 = match![1]!;
      const action = match![2]!;
      const happiness = parseInt(match![3]!) * (action === 'gain' ? 1 : -1);
      const person2 = match![4]!;
      this.map.set(`${person1}:${person2}`, new STValue(happiness));
      this.unique.add(person1);
      this.unique.add(person2);
    }
    this.unique.add('self')

    const permutations = getPermutations(Array.from(this.unique.values()));
    for (const permutation of permutations) {
      let happiness = 0;
      const cursor = new InputCursor(permutation);

      while(cursor.hasNext()) {
        const start = cursor.getAt(0);
        const current = cursor.get();
        let next = cursor.getNext();
        cursor.stepPositionForwards(1);

        if (next === null) {
          next = start;
        };

        happiness += (this.map.get(`${current}:${next}`)?.value) ?? 0;
        happiness += (this.map.get(`${next}:${current}`)?.value) ?? 0;
      }

      if (happiness > this.store.value!) {
        this.store.value = Math.max(happiness, this.store.value!);
      }
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
