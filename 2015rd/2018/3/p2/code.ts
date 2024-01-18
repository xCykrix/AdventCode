import { ClaimCountMap, getFabricClaim } from '../share.ts';

const def: string = Deno.readTextFileSync('./input');
const content = def.trim().split('\n');

// Final State Tracking.
let answer = '';

// Prepare Fabric Table
const claims = new ClaimCountMap();

// Extract and parse the fabric claims.
for (const c of content) {
  claims.add(getFabricClaim(c));
}

// Extract, parse, and check the fabric claims.
for (const c of content) {
  const claim = getFabricClaim(c);
  if (claims.check(claim)) {
    answer = `${claim.id}`;
  }
}

// Print Answer.
console.info('Answer:', answer);
