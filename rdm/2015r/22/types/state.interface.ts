
export interface GameState {
  histogram: string[];
  playerDefeatedBoss: boolean;
  playerHp: number;
  playerArmor: number;
  playerMana: number;
  playerTotalCost: number;
  bossHp: number;
  bossDamage: number;
  next: BaseSpell | null;
  shield: number;
  poison: number;
  recharge: number;
}

export enum GameStateResult {
  PLAYER_DIED,
  BOSS_DIED,
  NEXT_ROUND,
}

export interface BaseSpell {
  identifier: Spells;
  cost: number;
  damage: number;
  heal: number;
  restore: number;
  time: number;
}

export interface SpellIndex {
  [Spells.MAGIC_MISSILE]: Partial<BaseSpell>;
  [Spells.DRAIN]: Partial<BaseSpell>;
  [Spells.SHIELD]: Partial<BaseSpell>;
  [Spells.POISON]: Partial<BaseSpell>;
  [Spells.RECHARGE]: Partial<BaseSpell>;
}

export enum Spells {
  MAGIC_MISSILE = 'Magic_Missile',
  DRAIN = 'Drain',
  SHIELD = 'Shield',
  POISON = 'Poison',
  RECHARGE = 'Recharge',
}

export const SpellLookup: { [key: string]: Spells } = {
  'Magic_Missile': Spells.MAGIC_MISSILE,
  'Drain': Spells.DRAIN,
  'Shield': Spells.SHIELD,
  'Poison': Spells.POISON,
  'Recharge': Spells.RECHARGE,
}
