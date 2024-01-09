import { InputType, StorageHelper } from './storage.ts';
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

export class AOCHelper {
  public getInput<T extends InputType>(inputType: T, separator?: string): OutputType[T] {
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

interface OutputType {
  [InputType.STRING]: string;
  [InputType.SEPARATED_STRING]: string[];
  [InputType.LIST]: string[];
  [InputType.SEPARATED_LIST]: string[][];
}
