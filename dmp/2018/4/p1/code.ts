import { ShiftTracker, sort } from '../share.ts';

const def: string = Deno.readTextFileSync('./input');
const content = def.trim().split('\n');

// Final State Tracking.
let answer = '';

// Organize content

const contentSorted = sort(content);
const shiftTracker = new ShiftTracker();
for (const c of contentSorted) {
  shiftTracker.simulateUntil(c.content);
}

//
const track = shiftTracker.getTrack();
const storage: { id: string; max: number; minute: number }[] = [];
for (const k in track) {
  let max = -1;
  let minute = -1;
  for (const m in track[k]!.cell) {
  }
  storage.push({});
}

// Print Answer.
console.info('Answer:', answer);
