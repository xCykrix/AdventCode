import { AOC } from '../../util/state.ts';
import { StateEmulator } from './lib/emulate.ts';
import { StateGenerator } from './lib/state.ts';
import { BaseSpell, GameState, GameStateResult, SpellIndex, Spells } from './types/state.interface.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(Number.MAX_SAFE_INTEGER);

  private spells: SpellIndex = {
    [Spells.MAGIC_MISSILE]: { damage: 4, cost: 53 } as Partial<BaseSpell>,
    [Spells.DRAIN]: { damage: 2, heal: 2, cost: 73 } as Partial<BaseSpell>,
    [Spells.SHIELD]: { time: 6, cost: 113 } as Partial<BaseSpell>,
    [Spells.POISON]: {  damage: 3, time: 6, cost: 173 } as Partial<BaseSpell>,
    [Spells.RECHARGE]: { restore: 101, time: 5, cost: 229 } as Partial<BaseSpell>,
  }
  private generator = new StateGenerator(this.spells);
  private emulator = new StateEmulator(this.spells);

  private defaultGameStates: GameState[] = [
    ...this.generator.generate({
      histogram: [],
      playerDefeatedBoss: false,
      playerHp: 50,
      playerArmor: 0,
      playerMana: 500,
      playerTotalCost: 0,
      bossHp: 51,
      bossDamage: 9,
      next: null,
      shield: 0,
      poison: 0,
      recharge: 0,
    }),
  ];

  override async evaluate(): Promise<void> {
    const states: GameState[] = [];
    this.defaultGameStates.forEach((v) => states.push(this.generator.dereference(v)));

    while (states.length > 0) {
      const state = states.pop()!;
      if (state.playerTotalCost > this.store.get()) continue;

      const player = this.emulator.player(state);
      const boss = this.emulator.boss(state);

      if (player === GameStateResult.PLAYER_DIED || boss === GameStateResult.PLAYER_DIED) continue;
      if (player === GameStateResult.BOSS_DIED || boss === GameStateResult.BOSS_DIED) {
        this.store.set(Math.min(this.store.get(), state.playerTotalCost));
        continue;
      }

      if (player === GameStateResult.NEXT_ROUND && boss === GameStateResult.NEXT_ROUND) {
        states.push(...this.generator.generate(this.generator.dereference(state)));
      } else {
        console.error('Panic! NEXT_ROUND was found for both calculations but no death.')
      }
    }

    this.storage.makeStoredValue('Unknown', 'value').set(`${this.store.get()}`);
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
