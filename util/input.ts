/**
 * Process input as a string.
 */
export function getInputAsString(file: string): string {
  return Deno.readTextFileSync(file).trim();
}

/**
 * Process input as a string separated by {@param separator}
 */
export function getInputAsSeparatedString(file: string, separator = ''): string[] {
  return Deno.readTextFileSync(file).trim().split(separator);
}

/**
 * Process input as a list of strings.
 */
export function getInputAsList(file: string): string[] {
  return Deno.readTextFileSync(file).trim().split('\n');
}

/**
 * Process input as a list of strings separated by {@param separator}.
 */
export function getInputAsSeparatedList(file: string, separator = ''): string[][] {
  return getInputAsList(file).map((v) => v.split(separator))
}

// export class Cursor {
//   private list: string[];
//   private position = 0;

//   public constructor(list: string[], startAt = 0) {
//     this.list = list;
//     this.position = startAt;
//   }

//   public get(): string | null {
//     return this.list[this.position] ?? null;
//   }

//   public getNext(): string | null {
//     return this.list[this.position + 1] ?? null;
//   }

//   public getPrev(): string | null {
//     return this.list[this.position - 1] ?? null;
//   }

//   public getAsString(): string {
//     return this.list.join('');
//   }

//   public setPosition(value: number): void {
//     this.position = value;
//   }

//   public stepPositionForwards(value = 1): void {
//     this.setPosition(this.position + value);
//   }

//   public setPositionBackwards(value = 1): void {
//     this.setPosition(this.position - value);
//     if (this.position <= 0) {
//       this.position = 0;
//     }
//   }

//   public hasNext(): boolean {
//     return this.list.length > this.position;
//   }
// }
