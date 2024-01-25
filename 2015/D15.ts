import { CTF, CTFFramework } from 'framework/mod.ts';
import { CTFHelper } from 'framework/lib/helper.ts';
import { StoreValue, StoreValueMap } from 'framework/lib/storage.ts';

interface Ingredient {
  ingredient: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
}

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const ingredients = ctf.storage.getStoredMap<Ingredient>();
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/).parse()!;

    for (const v of input) {
      const ingredient = v[0]!.toLowerCase();
      const capacity = parseInt(v[1]!);
      const durability = parseInt(v[2]!);
      const flavor = parseInt(v[3]!);
      const texture = parseInt(v[4]!);
      const calories = parseInt(v[5]!);

      ingredients.set(
        ingredient,
        new StoreValue({
          ingredient,
          capacity,
          durability,
          flavor,
          texture,
          calories,
        }),
      );
    }

    let max = 0;
    for (let r1 = 0; r1 < 100; r1++) {
      for (let r2 = 0; r2 < 100 - r1; r2++) {
        for (let r3 = 0; r3 < 100 - r2 - r1; r3++) {
          const r4 = 100 - r3 - r2 - r1;
          if ((r4 + r3 + r2 + r1) !== 100) continue;

          const cookie = Static.cookie({
            r1,
            r2,
            r3,
            r4,
          }, ingredients);

          max = Math.max(max, cookie.score);
        }
      }
    }

    return `${max}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = CTFHelper.getInput().structured().from(import.meta.url).expression(/(.*): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/).parse()!;

    for (const v of input) {
    }

    return `${store.get()}`;
  }
}

class Static {
  public static cookie(recipe: { [key: string]: number; }, ingredients: StoreValueMap<Ingredient>): { score: number; calories: number; } {
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;
    let calories = 0;

    // Process each ingredient.
    for (const ingredient of ingredients.values()) {
      const spoons = recipe[ingredient.get().ingredient!]!;
      capacity = capacity + (spoons * ingredient.get().capacity);
      durability = durability + (spoons * ingredient.get().durability);
      flavor = flavor + (spoons * ingredient.get().flavor);
      texture = texture + (spoons * ingredient.get().texture);

      // Add calories.
      calories = calories + (spoons * ingredient.get().calories);
    }

    // If ingredient score is negative, revert to 0.
    if (capacity < 0) capacity = 0;
    if (durability < 0) durability = 0;
    if (flavor < 0) flavor = 0;
    if (texture < 0) texture = 0;

    // Calculate final score and return calories.
    const score = capacity * durability * flavor * texture;
    return {
      score: score,
      calories,
    };
  }
}

await CTF.do(new CTFExecute());
