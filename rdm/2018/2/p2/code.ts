import { CharacterCountMap } from '../share.ts';

const def: string = Deno.readTextFileSync('./input');
const content = def.trim().split('\n');

// Final State Tracking
let answer = 'Not Found';

// Internal Types
type CharCounterResult = { [key: string]: number };

// Get character counts and parse to processable format.
function getCharacterCount(line: string): CharCounterResult {
  const characterCounter = new CharacterCountMap();
  const chars = line.split('');
  for (const char of chars) {
    characterCounter.add(char);
  }
  const result: CharCounterResult = {};
  characterCounter.get().forEach(([c, v]) => {
    result[c] = v;
  });
  return result;
}

// Simple diff the character counter by checking counts of each character from left to right.
function diffCharacterCount(d1: CharCounterResult, d2: CharCounterResult): number {
  let diffs = 0;
  for (const k in d1) {
    if (d2[k] !== d1[k]) {
      diffs++;
    }
  }
  return diffs;
}

// Count all characters in the box identifier left to right and parse for answer.
const matches: [string, string][] = [];
for (const current of content) {
  const currentCharacterCounter = getCharacterCount(current);
  for (const check of content) {
    if (diffCharacterCount(currentCharacterCounter, getCharacterCount(check)) === 1) {
      matches.push([current, check]);
    }
  }
}

// Process matches for final answer.
for (const match of matches) {
  // Split match 1 and match 2 into charsets.
  const m1 = match[0]!.split('');
  const m2 = match[1]!.split('');

  // Define counters.
  let i = 0;
  let changes = 0;

  // Loop over m1 and check against m2 for differences.
  for (const char of m1) {
    if (m2[i] !== char) {
      m2[i] = '';
      changes++;
    }
    i++;
  }

  // If only 1 difference is found, this is the final answer.
  if (changes === 1) {
    answer = m2.join('');
    break;
  }
}

// Print Answer.
console.info('Answer:', answer);
