import { getInputAsSeparatedList, getInputAsSeparatedString } from './input.ts';
import { getInputAsList } from './input.ts';
import { getInputAsString } from './input.ts';

export abstract class AOC {
  public helper = new AOCHelper();
  public storage = new StorageHelper();

  async execute(): Promise<void> {
    await this.evaluate();
    console.info('Result:', this.storage.getValueStorage('Unknown', 'value')?.getValueAsString());
  }

  abstract evaluate(): Promise<void>;
}

export class AOCHelper {
  public getInput(inputType: InputType, separator?: string): string | string[] | string[][] {
    switch (inputType) {
      case InputType.STRING: {
        return getInputAsString('./input');
      }
      case InputType.SEPARATED_STRING: {
        return getInputAsSeparatedString('./input', separator);
      }
      case InputType.LIST: {
        return getInputAsList('./input');
      }
      case InputType.SEPARATED_LIST: {
        return getInputAsSeparatedList('./input', separator);
      }
    }
  }
}

export class StorageHelper {
  private stMapStorage: Map<string, STMap> = new Map();
  private stValueStorage: Map<string, STValue> = new Map();

  public getMapStorage<T = string>(id = crypto.randomUUID()): STMap<T> {
    if (!this.stMapStorage.has(id)) this.stMapStorage.set(id, new STMap<T>());
    return this.stMapStorage.get(id) as STMap<T> ?? null;
  }

  public getValueStorage<T = string>(defaultValue: T, id = crypto.randomUUID()): STValue<T> {
    if (!this.stValueStorage.has(id)) this.stValueStorage.set(id, new STValue<T>(defaultValue ?? null));
    return this.stValueStorage.get(id) as STValue<T>;
  }
}

export class STMap<T = unknown> extends Map<string, STValue<T>> {
  public addIntegerToValue(key: string, integer: number): void {
    if (!this.has(key)) this.set(key, new STValue<number>(0) as STValue<T>);
    this.get(key)?.addNumberToValue(integer);
  }

  public subtractIntegerFromValue(key: string, integer: number): void {
    this.addIntegerToValue(key, integer * -1);
  }
}

export class STValue<T = unknown> {
  private _value: T | null = null;

  public constructor (value: T | null) {
    this._value = value;
  }

  // deno-lint-ignore explicit-module-boundary-types
  public set value(value: T | null) {
    this._value = value;
  }

  public get value(): T | null {
    return this._value
  }

  public toString(): string {
    return this._value as string;
  }

  public addNumberToValue(value: number): void {
    this._value = parseInt(`${this._value!}`) + value as T;
  }

  public subtractNumberFromValue(value: number): void {
    this.addNumberToValue(value * -1);
  }

  public getValueOrDefault(defaultValue: T | null): T | null {
    return this.value ?? defaultValue;
  }

  public getValueAsString(): string | null {
    return this.value as string | null;
  }
}

export enum InputType {
  STRING,
  SEPARATED_STRING,
  LIST,
  SEPARATED_LIST,
}
