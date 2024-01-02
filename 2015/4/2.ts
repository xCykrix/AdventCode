import { AOC, InputType } from '../../util/state.ts';

import * as standardCrypto from 'https://deno.land/std@0.210.0/crypto/mod.ts';
import * as standardBytes from "https://deno.land/std@0.210.0/bytes/mod.ts";

class AOCDay extends AOC {
  override async evaluate(): Promise<void> {
    const defaultStorage = this.storage.getValueStorage<number>(0);
    const uint8Compare = new Uint8Array([0, 0, 0]);

    // Start of AOC
    const v = this.helper.getInput(InputType.STRING, '');
    while (true) {
      // Generate input to MD5.
      const value = `${v}${defaultStorage}`;

      // Calculate the md5hash.
      // deno-lint-ignore no-await-in-loop
      const md5hash = await standardCrypto.crypto.subtle.digest('MD5', new TextEncoder().encode(value));

      // Fast fail with raw byte comparison. Possible due to 000000 as prefix.
      const buffer = new Uint8Array(md5hash);
      if (!standardBytes.startsWith(buffer, uint8Compare)) {
        defaultStorage.addNumberToValue(1);
        continue;
      }

      break;
    }

    // Store Result of AOC.
    this.storage.getValueStorage('Unknown', 'value').value = defaultStorage.getValueAsString();
  }
}

// // Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
