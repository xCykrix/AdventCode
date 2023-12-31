import { getInputAsSeparatedList } from './input.ts';
import { getInputAsList } from './input.ts';
import { getInputAsString } from './input.ts';

export abstract class AOC {
  public storage = new StorageHelper();

  async execute(): Promise<void> {
    await this.evaluate();
    console.info('Result:', this.storage.getValueStorage('value')?.getValueAsString());
  }

  abstract evaluate(): Promise<void>;
}

export class AOCHelper {

}

export class StorageHelper {
  private stMapStorage: Map<string, STMap> = new Map();
  private stValueStorage: Map<string, STValue> = new Map();

  public getMapStorage<T = string>(id = crypto.randomUUID()): STMap<T> | null {
    if (!this.stMapStorage.has(id)) this.stMapStorage.set(id, new STMap<T>());
    return this.stMapStorage.get(id) as STMap<T> ?? null;
  }

  public getValueStorage<T = string>(id = crypto.randomUUID()): STValue<T> | null {
    if (!this.stValueStorage.has(id)) this.stValueStorage.set(id, new STValue<T>(null));
    return this.stValueStorage.get(id) as STValue<T>;
  }
}

export class STMap<T = unknown> extends Map<string, STValue<T>> {

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
  LIST,
  SEPARATED_LIST,
}


// import { info } from './log.ts';


// export abstract class AOCBase {
//   public readonly inputAsString: string = '';
//   public readonly inputAsList: string[] = [];
//   public readonly inputAsSeparatedList: string[][] = [];

//   public readonly genericStorage = new Map<string, AOCGenericStorage>();
//   public storage = new AOCStorageService();

//   public constructor(inputType: InputType, separator = '') {
//     switch (inputType) {
//       case 'STRING': {
//         this.inputAsString = getInputAsString('./input');
//         break;
//       }
//       case 'LIST': {
//         this.inputAsList = getInputAsList('./input');
//         break;
//       }
//       case 'SEPARATED_LIST': {
//         this.inputAsSeparatedList = getInputAsSeparatedList('./input', separator);
//         break;
//       }
//     }
//   }



//   }

// }

// class AOCStorageService {
//   private _storage = new Map<string, AOCGenericStorage<unknown>>();
//   private _cache = new Map<string, AOCCache<unknown>>();

//   public getStorage<T = string>(id: 'default' | 'output' | 'MEM1' | 'MEM2' | 'MEM3' | 'MEM4', defaulted: T): AOCGenericStorage<T> {
//     if (this._storage.has(id)) return this._storage.get(id)! as AOCGenericStorage<T>;
//     this._storage.set(id, new AOCGenericStorage<T>(defaulted));
//     return this._storage.get(id) as AOCGenericStorage<T>;
//   }

//   public getCache<T>(id: 'default' | 'MEM1' | 'MEM2' | 'MEM3' | 'MEM4'): AOCCache<T> {
//     if (this._cache.has(id)) return this._cache.get(id) as AOCCache<T>;
//     this._cache.set(id, new AOCCache<T>());
//     return this._cache.get(id) as AOCCache<T>;
//   }
// }

// export class AOCGenericStorage<T = string> {
//   private _storage: T;
//   private _lock = false;

//   public constructor(storage: T) {
//     this._storage = storage;
//   }

//   public set(value: T): void {
//     if (this.isLocked()) return;
//     this._storage = value;
//   }

//   public addInteger(value = 1): void {
//     this.set((parseInt(this.getAsString()) + value) as T);
//   }

//   public subtractInteger(value = 1): void {
//     this.set((parseInt(this.getAsString()) - value) as T);
//   }

//   public get(): T {
//     return this._storage;
//   }

//   public getAsString(): string {
//     return this._storage as string;
//   }

//   public lock(): void {
//     this._lock = true;
//   }

//   public unlock(): void {
//     this._lock = false;
//   }

//   public isLocked(): boolean {
//     return this._lock;
//   }
// }

// export class AOCCache<B = string> {
//   private _cache: Map<string, B> = new Map<string, B>();

//   public setValue(key: string, value: B): void {
//     this._cache.set(key, value)
//   }

//   public addIntegerToValue(key: string, integer: number): void {
//     this._cache.set(key, parseInt((this._cache.get(key) ?? 0) as string) + integer as B);
//   }

//   public subtractIntegerFromValue(key: string, integer: number): void {
//     this._cache.set(key, parseInt((this._cache.get(key) ?? 0) as string) - integer as B);
//   }

//   public get(key: string): B | null {
//     return this._cache.get(key) ?? null
//   }

//   public getAll(): [string, B][] {
//     return Array.from(this._cache.entries());
//   }

//   public has(key: string): boolean {
//     return this._cache.has(key);
//   }

//   public delete(key: string): void {
//     this._cache.delete(key);
//   }

//   public deleteAll(): void {
//     this._cache.clear();
//   }

//   public getSize(): number {
//     return this._cache.size;
//   }
// }
