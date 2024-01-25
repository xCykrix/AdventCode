import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

import { cartesianProduct, combinations } from 'x/combinatorics@1.1.2/mod.ts';

interface Item {
  name: string;
  cost: number;
  damage: number;
  armor: number;
}

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(Infinity);

  // Regular Expressions.
  private itemParse = /^([A-Za-z0-9+ ]+)\s{2,}(\d+)\s{2,}(\d+)\s{2,}(\d+)$/;

  private generateItemMap(v: string, expression: RegExp): Item {
    const parse = v.match(expression)!;
    return {
      name: parse[1]!.trim(),
      cost: parseInt(parse[2]!),
      damage: parseInt(parse[3]!),
      armor: parseInt(parse[4]!),
    };
  }

  override async evaluate(): Promise<void> {
    const v = this.helper.getInput(InputType.STRING);
    const r = v.split('\n\n');
    const weapons = r[0]!.split('\n').slice(1).map((v) => this.generateItemMap(v, this.itemParse));
    const armor = r[1]!.split('\n').slice(1).map((v) => this.generateItemMap(v, this.itemParse));
    const rings = r[2]!.split('\n').slice(1).map((v) => this.generateItemMap(v, this.itemParse));

    armor.push({ name: 'Excluded', cost: 0, damage: 0, armor: 0 });
    rings.push({ name: 'Excluded', cost: 0, damage: 0, armor: 0 });

    for (const item of cartesianProduct(weapons, armor, [...combinations(rings, 2)])) {
      const stats = item.reduce((acc, item) => {
        if (Array.isArray(item)) {
          acc.cost += item[0]!.cost + item[1]!.cost;
          acc.damage += item[0]!.damage + item[1]!.damage;
          acc.armor += item[0]!.armor + item[1]!.armor;
        } else {
          acc.cost += item.cost;
          acc.damage += item.damage;
          acc.armor += item.armor;
        }
        return acc;
      }, { cost: 0, damage: 0, armor: 0 });

      // Simulate Battle
      const boss = {
        hp: 100,
        damage: 8,
        armor: 2,
      };
      const player = {
        hp: 100,
        damage: stats.damage,
        armor: stats.armor,
      };

      let state = true;
      while (boss.hp > 1 && player.hp > 1) {
        if (state === true) {
          // Player Turn
          const damage = player.damage - boss.armor;
          boss.hp -= damage > 1 ? damage : 1;
        } else {
          // Boss Turn
          const damage = boss.damage - player.armor;
          player.hp -= damage > 1 ? damage : 1;
        }

        state = !state;
      }

      if (boss.hp <= 0) {
        this.store.set(Math.min(this.store.get(), stats.cost));
      }
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.get()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
