import { getInputAsList } from '../../../util/input.ts';
import { AOCState } from '../../../util/state.ts';

const aocInput = getInputAsList('./input');
const aocState = new AOCState<number, null>(0);

// Set to track frequencies.
const history = new Set<number>();

// Execute all frequencies in the sequence.
while (!found) {
  for (const c of content) {
    const change = parseInt(c);
    answer += change;
    if (history.has(answer)) {
      found = true;
      break;
    }
    history.add(answer);
  }
}

// Print Answer.
console.info('Answer:', answer);
