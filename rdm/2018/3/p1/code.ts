import { ClaimCountMap, getFabricClaim } from '../share.ts';

const def: string = Deno.readTextFileSync('./input');
const content = def.trim().split('\n');

// Prepare Fabric Table
const claims = new ClaimCountMap();

// Extract and parse the fabric claims.
for (const c of content) {
  claims.add(getFabricClaim(c));
}

// Print Answer.
console.info('Answer:', claims.getOverlap());
