import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

import * as standardBytes from 'std/bytes/mod.ts';
import * as standardCrypto from 'std/crypto/mod.ts';
import { encodeHex } from 'std/encoding/hex.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    const uint8Compare = new Uint8Array([0, 0]);
    const v = this.helper.getInput(InputType.STRING, '');

    while (true) {
      // Process the input.
      const value = `${v}${this.store}`;

      // Calculate the md5hash.
      // deno-lint-ignore no-await-in-loop
      const md5hash = await standardCrypto.crypto.subtle.digest('MD5', new TextEncoder().encode(value));

      // Fast fail with raw byte comparison. Checks for partial answer of 0000.
      const buffer = new Uint8Array(md5hash);
      if (!standardBytes.startsWith(buffer, uint8Compare)) {
        this.store.add(1);
        continue;
      }

      // Slow fail with encoding to hex and validating startsWith to check for 00000 after above passes.
      const hex = encodeHex(md5hash);
      if (!hex.startsWith('00000')) {
        this.store.add(1);
        continue;
      }

      break;
    }

    // Store Result of AOC.
    this.storage.makeStoredValue('Unknown', 'value').set(this.store.toString());
  }
}

// Execute AOC.
const aoc = new AOCDay();
await aoc.execute();
