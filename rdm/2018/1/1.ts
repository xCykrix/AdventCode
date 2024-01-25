import { getInputAsList } from '../../../util/input.ts';
import { AOCState } from '../../../util/state.ts';

const aocInput = getInputAsList('./input');
const aocState = new AOCState<number, null>(0);

// Execute all frequencies in the sequence.
for (const c of aocInput) {
  aocState.setResult(aocState.result + parseInt(c));
}

// Print Answer.
console.info('Answer:', aocState.result);
