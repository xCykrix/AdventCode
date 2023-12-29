import { AOCBase } from '../../util/state.ts';

import * as standardCrypto from 'https://deno.land/std@0.210.0/crypto/mod.ts';
import * as standardBytes from "https://deno.land/std@0.210.0/bytes/mod.ts";
import { encodeHex } from 'https://deno.land/std@0.210.0/encoding/hex.ts';

class AOC extends AOCBase {
  override async evaluate(b: Deno.BenchContext | null, self: AOCBase): Promise<void> {
    // Load the State. This includes preparing memory and reading from disk.
    const defaultStorage = self.storage.getStorage('default', 0);
    const resultStorage = self.storage.getStorage('output', '');
    const uint8Compare = new Uint8Array([0, 0]);

    // If benchmarking, throw 'WouldBlock' as brute-force benchmarking is not viable.
    if (b) throw new Deno.errors.WouldBlock("Brute-force code benchmarks are not viable.");

    // Execute AOC and Benchmarks (if applicable).
    while (true) {
      // Generate input to MD5.
      const value = `${self.inputAsString}${defaultStorage.getAsString()}`;

      // deno-lint-ignore no-await-in-loop
      const md5hash = await standardCrypto.crypto.subtle.digest('MD5', new TextEncoder().encode(value));
      const buffer = new Uint8Array(md5hash);
      if (!standardBytes.startsWith(buffer, uint8Compare)) {
        defaultStorage.addInteger();
        continue;
      }
      const hex = encodeHex(md5hash);

      if (!hex.startsWith('00000')) {
        defaultStorage.addInteger();
        continue;
      }

      break;
    }

    // Store Result.
    resultStorage.set(`${defaultStorage.getAsString()}`);
  }
}

// Execute AOC.
const aoc = new AOC('STRING', '');
await aoc.execute();
