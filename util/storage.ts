import { StoreValueMap, StoreValue } from './state.ts';


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
