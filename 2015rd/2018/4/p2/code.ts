const def: string = Deno.readTextFileSync('./input');
const content = def.trim().split('\n');

// Final State Tracking.
let answer = 0;
let found = false;

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
