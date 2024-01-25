import { GameState, GameStateResult, SpellIndex, Spells } from '../types/state.interface.ts';

export class StateEmulator {
  private spells: SpellIndex;

  public constructor(base: SpellIndex) {
    this.spells = base;
  }

  public player(state: GameState, hard = false): GameStateResult {
    if (hard === true) {
      state.playerHp--;
      if (state.playerHp <= 0) return GameStateResult.PLAYER_DIED;
    }

    this.effects(state);

    if (state.playerHp <= 0) return GameStateResult.PLAYER_DIED;
    if (state.bossHp <= 0) return GameStateResult.BOSS_DIED;

    if (state.next!.cost > state.playerMana) return GameStateResult.PLAYER_DIED;
    state.playerMana -= state.next!.cost!;
    state.playerTotalCost += state.next!.cost!;

    if (state.next!.identifier === Spells.MAGIC_MISSILE || state.next!.identifier === Spells.DRAIN) {
      state.bossHp -= state.next!.damage;
      state.playerHp += state.next?.heal ?? 0;
    }
    if (state.next!.identifier === Spells.SHIELD) {
      state.playerArmor = 7;
      state.shield = state.next!.time;
    }
    if (state.next!.identifier === Spells.POISON) {
      state.poison = state.next!.time;
    }
    if (state.next!.identifier === Spells.RECHARGE) {
      state.recharge = state.next!.time;
    }

    return GameStateResult.NEXT_ROUND;
  }

  public boss(state: GameState): GameStateResult {
    this.effects(state);

    if (state.playerHp <= 0) return GameStateResult.PLAYER_DIED;
    if (state.bossHp <= 0) return GameStateResult.BOSS_DIED;

    state.playerHp -= Math.max(1, state.bossDamage - state.playerArmor);

    if (state.playerHp <= 0) return GameStateResult.PLAYER_DIED;

    return GameStateResult.NEXT_ROUND;
  }

  private effects(state: GameState): void {
    // Tick Shield State
    if (state.shield-- > 0) {
      state.playerArmor = 7;
    } else {
      state.playerArmor = 0;
    }

    // Tick Poison State
    if (state.poison-- > 0) {
      state.bossHp -= this.spells[Spells.POISON].damage!;
    }

    // Tick Recharge State
    if (state.recharge-- > 0) {
      state.playerMana += this.spells[Spells.RECHARGE].restore!;
    }
  }
}
