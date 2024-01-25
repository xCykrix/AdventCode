import { BaseSpell, GameState, SpellIndex, SpellLookup, Spells } from '../types/state.interface.ts';

export class StateGenerator {
  private spells: BaseSpell[] = [];

  public constructor(base: SpellIndex) {
    for (const k of Object.keys(base)) {
      const spell = base[SpellLookup[k]!];
      spell.identifier = SpellLookup[k]!;
      this.spells.push(spell as BaseSpell);
    }
  }

  public *generate(ref: GameState): Generator<GameState> {
    for (const spell of this.spells) {
      const state = this.dereference(ref);
      if (state.shield > 1 && spell.identifier === Spells.SHIELD) continue;
      if (state.poison > 1 && spell.identifier === Spells.POISON) continue;
      if (state.recharge > 1 && spell.identifier === Spells.RECHARGE) continue;
      state.next = spell;
      yield this.dereference(state);
    }
  }

  public dereference(ref: GameState): GameState {
    // deno-lint-ignore no-undef
    return structuredClone(ref)
  }
}
