import { InputType } from '../../util/helper/input.ts';
import { AOC } from '../../util/state.ts';

import * as standardBytes from 'std/bytes/mod.ts';
import * as standardCrypto from 'std/crypto/mod.ts';

class AOCDay extends AOC {
  private store = this.storage.makeStoredValue<number>(0);

  override async evaluate(): Promise<void> {
    const uint8Compare = new Uint8Array([0, 0, 0]);
    const v = this.helper.getInput(InputType.STRING, '');

    while (true) {
      // Process the input.
      const value = `${v}${this.store}`;

      // Calculate the md5hash.
      // deno-lint-ignore no-await-in-loop
      const md5hash = await standardCrypto.crypto.subtle.digest('MD5', new TextEncoder().encode(value));

      // Check with full byte comparison. Possible due to 000000 as prefix instead of 00000 for Part 1.
      const buffer = new Uint8Array(md5hash);
      if (!standardBytes.startsWith(buffer, uint8Compare)) {
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
