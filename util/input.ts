/**
 * Read input file as text and return as a String.
 */
export function getInputAsString(file: string): string {
  return Deno.readTextFileSync(file).trim();
}

/**
 * Read input file as text and return input as a List of Strings separated by New Lines.
 */
export function getInputAsList(file: string): string[] {
  return Deno.readTextFileSync(file).trim().split('\n');
}

/**
 * Read input file as text and return input as a List of Characters separated by New Lines.
 */
export function getInputAsSeparatedList(file: string, separator = ''): string[][] {
  return getInputAsList(file).map((v) => v.split(separator))
}

export class SeparatedListCursor {
  private list: string[];
  private position = 0;

  public constructor(list: string[], startAt = 0) {
    this.list = list;
    this.position = startAt;
  }

  public get(): string | null {
    return this.list[this.position] ?? null;
  }

  public getNext(): string | null {
    return this.list[this.position + 1] ?? null;
  }

  public getPrev(): string | null {
    return this.list[this.position - 1] ?? null;
  }

  public getAsString(): string {
    return this.list.join('');
  }

  public setPosition(value: number): void {
    this.position = value;
  }

  public stepPositionForwards(value = 1): void {
    this.setPosition(this.position + value);
  }

  public setPositionBackwards(value = 1): void {
    this.setPosition(this.position - value);
    if (this.position <= 0) {
      this.position = 0;
    }
  }

  public hasNext(): boolean {
    return this.list.length > this.position;
  }
}
