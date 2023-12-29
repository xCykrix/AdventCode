const parseFabricClaim = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

export interface FabricClaim {
  id: number;
  topLeftX: number;
  topLeftY: number;
  x: number;
  y: number;
}

export function getFabricClaim(ticket: string): FabricClaim {
  const match = parseFabricClaim.exec(ticket.trim());
  return {
    id: parseInt(match![1]!),
    topLeftX: parseInt(match![2]!),
    topLeftY: parseInt(match![3]!),
    x: parseInt(match![4]!),
    y: parseInt(match![5]!),
  };
}

export class ClaimCountMap {
  private map: Map<string, number> = new Map();

  public add(claim: FabricClaim): void {
    for (let x = claim.topLeftX; x < claim.topLeftX + claim.x; x++) {
      for (let y = claim.topLeftY; y < claim.topLeftY + claim.y; y++) {
        this.map.set(`${x},${y}`, (this.map.get(`${x},${y}`) ?? 0) + 1);
      }
    }
  }

  public check(claim: FabricClaim): boolean {
    let hasOverlapping = false;
    for (let x = claim.topLeftX; x < claim.topLeftX + claim.x; x++) {
      for (let y = claim.topLeftY; y < claim.topLeftY + claim.y; y++) {
        if (this.map.get(`${x},${y}`) !== 1) {
          hasOverlapping = true;
          break;
        }
      }
      if (hasOverlapping) break;
    }
    return !hasOverlapping;
  }

  public getOverlap(): number {
    let i = 0;
    Array.from(this.map.entries()).forEach(([_, v]) => {
      if (v > 1) {
        i++;
      }
    });
    return i;
  }
}
