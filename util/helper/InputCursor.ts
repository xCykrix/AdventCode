
export class InputCursor {
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

  public getAt(index: number): string | null {
    return this.list[index] ?? null;
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
