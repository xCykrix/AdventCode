import { CharacterCountMap } from '../share.ts';

const def: string = Deno.readTextFileSync('./input');
const content = def.trim().split('\n');

// Final State Tracking
let char2 = 0;
let char3 = 0;

// Count all characters in the box identifier left to right and parse for answer.
for (const c of content) {
  // Initialize counter.
  const counter = new CharacterCountMap();

  // Add characters to counter.
  const chars = c.split('');
  for (const char of chars) {
    counter.add(char);
  }

  // Parse counter. Each entry should only be counted once per 2char or 3char, so block additional === 2 or === 3 results.
  let blockChar2 = false;
  let blockChar3 = false;
  for (const [_, count] of counter.get()) {
    // If count is 2, add to char2 and block.
    if (count === 2 && !blockChar2) {
      char2++;
      blockChar2 = true;
    }
    // If count is 3, add to char3 and block.
    if (count === 3 && !blockChar3) {
      char3++;
      blockChar3 = true;
    }
  }
}

// Print Answer.
console.info('Answer:', char2 * char3);
