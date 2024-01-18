import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';
import { StoreValue } from '../../util/storage.ts';

interface Ingredient {
  ingredient: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
}

interface Recipe {
  sugar: number;
  sprinkles: number;
  candy: number;
  chocolate: number;
  [key: string]: number;
}

class AOCDay extends AOC {
  private ingredients = this.storage.makeStoredMap<Ingredient>();

  // Regular Expressions.
  private parse = /(.*): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

  private cookie(recipe: Recipe): number {
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;

    // Process each ingredient.
    for (const ingredient of this.ingredients.values()) {
      const spoons = recipe[ingredient.get().ingredient!]!;
      capacity = capacity + (spoons * ingredient.get().capacity);
      durability = durability + (spoons * ingredient.get().durability);
      flavor = flavor + (spoons * ingredient.get().flavor);
      texture = texture + (spoons * ingredient.get().texture);
    }

    // If ingredient score is negative, revert to 0.
    if (capacity < 0) capacity = 0;
    if (durability < 0) durability = 0;
    if (flavor < 0) flavor = 0;
    if (texture < 0) texture = 0;

    // Calculate final score.
    const score = capacity * durability * flavor * texture;
    return score;
  }

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST)) {
      // Process the input.
      const matches = v.match(this.parse);
      const ingredient = matches![1]!.toLowerCase();
      const capacity = parseInt(matches![2]!);
      const durability = parseInt(matches![3]!);
      const flavor = parseInt(matches![4]!);
      const texture = parseInt(matches![5]!);
      const calories = parseInt(matches![6]!);

      // Store Ingredient Properties.
      this.ingredients.set(
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

    // Brute force all cookies for the highest score.
    let max = 0;
    for (let sugar = 0; sugar < 100; sugar++) {
      for (let sprinkles = 0; sprinkles < 100 - sugar; sprinkles++) {
        for (let candy = 0; candy < 100 - sugar - sprinkles; candy++) {
          const chocolate = 100 - sugar - sprinkles - candy;
          // Skip cookies that do not have a recipe total of 100 spoons.
          if ((sugar + sprinkles + candy + chocolate) !== 100) {
            continue;
          }

          // Generate cookie.
          const cookie = this.cookie({
            sugar,
            sprinkles,
            candy,
            chocolate,
          });

          // Save highest score.
          if (Math.max(max, cookie) > max) {
            max = cookie;
          }
        }
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${max}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
