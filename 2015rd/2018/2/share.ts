// Character Counter Class
export class CharacterCountMap {
  private map: Map<string, number> = new Map();

  public add(char: string): void {
    this.map.set(char, (this.map.get(char) ?? 0) + 1);
  }

  public get(): [string, number][] {
    return Array.from(this.map.entries());
  }

  public clear(): void {
    this.map.clear();
  }
}
