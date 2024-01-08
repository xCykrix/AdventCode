import { getInputAsSeparatedList, getInputAsSeparatedString } from './input.ts';
import { getInputAsList } from './input.ts';
import { getInputAsString } from './input.ts';

export abstract class AOC {
  public helper = new AOCHelper();
  public storage = new StorageHelper();

  async execute(): Promise<void> {
    await this.evaluate();
    console.info('Result:', this.storage.makeStoredValue('Unknown', 'value')?.toString());
  }

  abstract evaluate(): Promise<void>;
}

interface InputRefType {
  [InputType.STRING]: string;
  [InputType.SEPARATED_STRING]: string[];
  [InputType.LIST]: string[];
  [InputType.SEPARATED_LIST]: string[][];
}

export class AOCHelper {
  public getInput<T extends InputType>(inputType: T, separator?: string): InputRefType[T] {
    return {
      get [InputType.STRING]() {
        return getInputAsString('./input');
      },
      get [InputType.SEPARATED_STRING]() {
        return getInputAsSeparatedString('./input', separator ?? '');
      },
      get [InputType.LIST]() {
        return getInputAsList('./input');
      },
      get [InputType.SEPARATED_LIST]() {
        return getInputAsSeparatedList('./input', separator ?? '');
      }
    }[inputType];
  }
}

export class StorageHelper {
  private stMapStorage: Map<string, StoreValueMap> = new Map();
  private stValueStorage: Map<string, StoreValue> = new Map();

  public makeStoredMap<T = string>(id = crypto.randomUUID()): StoreValueMap<T> {
    if (!this.stMapStorage.has(id)) this.stMapStorage.set(id, new StoreValueMap<T>());
    return this.stMapStorage.get(id) as StoreValueMap<T>;
  }

  public makeStoredValue<T = string>(defaultValue: T, id = crypto.randomUUID()): StoreValue<T> {
    if (!this.stValueStorage.has(id)) this.stValueStorage.set(id, new StoreValue<T>(defaultValue));
    return this.stValueStorage.get(id) as StoreValue<T>;
  }
}

export class StoreValueMap<T = unknown> extends Map<string, StoreValue<T>> {
  public addIntegerToValue(key: string, integer: number): void {
    if (!this.has(key)) this.set(key, new StoreValue<number>(0) as StoreValue<T>);
    this.get(key)?.add(integer);
  }

  public subtractIntegerFromValue(key: string, integer: number): void {
    this.addIntegerToValue(key, integer * -1);
  }
}

export class StoreValue<T = unknown> {
  private _value: T;

  public constructor (value: T) {
    this._value = value;
  }

  public set(value: T): void {
    this._value = value;
  }

  public add(value: number): void {
    this._value = this._value as number + value as T;
  }

  public subtract(value: number): void {
    this.add(value * -1);
  }

  public toggle(): void {
    (this._value as boolean) = (!this._value as boolean);
  }

  public get(): T {
    return this._value;
  }

  public getOrDefault(defaultValue: T): T {
    return this.get() ?? defaultValue;
  }

  public toString(): string {
    return `${this._value}`;
  }

}

export enum InputType {
  STRING = 'STRING',
  SEPARATED_STRING = 'SEPARATED_STRING',
  LIST = 'LIST',
  SEPARATED_LIST = 'SEPARATED_LIST',
}
