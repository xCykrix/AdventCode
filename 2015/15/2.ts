import { AOC, InputType, STValue } from '../../util/state.ts';

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
  private ingredients = this.storage.getMapStorage<Ingredient>();

  // Regular Expressions.
  private parse = /(.*): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

  private cookie(recipe: Recipe): { cookie: number; calories: number; } {
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;
    let calories = 0;

    for (const ingredient of this.ingredients.values()) {
      const spoons = recipe[ingredient.value!.ingredient!]!;
      capacity = capacity + (spoons * ingredient.value!.capacity);
      durability = durability + (spoons * ingredient.value!.durability);
      flavor = flavor + (spoons * ingredient.value!.flavor);
      texture = texture + (spoons * ingredient.value!.texture);
      calories = calories + (spoons * ingredient.value!.calories);
    }
    if (capacity < 0) capacity = 0;
    if (durability < 0) durability = 0;
    if (flavor < 0) flavor = 0;
    if (texture < 0) texture = 0;

    const multiplication = capacity * durability * flavor * texture;
    return {
      cookie: multiplication,
      calories
    };
  }

  override async evaluate(): Promise<void> {
    for (const v of this.helper.getInput(InputType.LIST, '') as string[]) {
      const matches = v.match(this.parse);
      const ingredient = matches![1]!.toLowerCase();
      const capacity = parseInt(matches![2]!);
      const durability = parseInt(matches![3]!);
      const flavor = parseInt(matches![4]!);
      const texture = parseInt(matches![5]!);
      const calories = parseInt(matches![6]!);

      this.ingredients.set(
        ingredient,
        new STValue({
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
    for (let sugar = 0; sugar < 100; sugar++) {
      for (let sprinkles = 0; sprinkles < 100 - sugar; sprinkles++) {
        for (let candy = 0; candy < 100 - sugar - sprinkles; candy++) {
          const chocolate = 100 - sugar - sprinkles - candy;
          if ((sugar + sprinkles + candy + chocolate) !== 100) {
            continue;
          };
          const cookie = this.cookie({
            sugar,
            sprinkles,
            candy,
            chocolate,
          });
          if (Math.max(max, cookie.cookie) > max && cookie.calories === 500) {
            max = cookie.cookie;
          }
        }
      }
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = `${max}`;
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
