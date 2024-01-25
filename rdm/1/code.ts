import { getInputAsList } from '../../util/input.ts';
import { AOCState } from '../../util/state.ts';

const aocInput = getInputAsList('./input');
const aocState = new AOCState<number, null>(0);
