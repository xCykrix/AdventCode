import { StringInputType } from 'framework/lib/helper/input.ts';
import { CTF, CTFFramework } from 'framework/mod.ts';

import * as standardBytes from 'std/bytes/mod.ts';
import * as standardCrypto from 'std/crypto/mod.ts';
import { encodeHex } from 'std/encoding/hex.ts';
import { CTFHelper } from 'framework/lib/helper.ts';

const uint8short = new Uint8Array([0, 0]);
const uint8long = new Uint8Array([0, 0, 0]);

export class CTFExecute extends CTFFramework<string> {
  public constructor() {
    super();
    this.register('P1', this.P1);
    this.register('P2', this.P2);
  }

  private async P1(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = CTFHelper.getInput().structured().with(import.meta.url).getString(StringInputType.STRING)!;

    for (const vg of generate(input)) {
      const v = await encode(vg);
      if (!check(v)) {
        store.add(1);
        continue;
      }
      if (!validate(v)) {
        store.add(1);
        continue;
      }
      break;
    }

    return `${store.get()}`;
  }

  private async P2(ctf: CTFFramework): Promise<string> {
    const store = ctf.storage.getStoredValue(0);
    const input = CTFHelper.getInput().structured().with(import.meta.url).getString(StringInputType.STRING)!;

    for (const vg of generate(input)) {
      const v = await encode(vg);
      if (!check(v, true)) {
        store.add(1);
        continue;
      }
      if (!validate(v, true)) {
        store.add(1);
        continue;
      }
      break;
    }

    return `${store.get()}`;
  }
}

function* generate(v: string): Generator<Uint8Array> {
  let i = 0;
  const encoder = new TextEncoder();
  while (true) {
    yield encoder.encode(`${v}${i++}`);
  }
}

async function encode(v: Uint8Array): Promise<Uint8Array> {
  return new Uint8Array(await standardCrypto.crypto.subtle.digest('MD5', v));
}

function check(v: Uint8Array, long = false): boolean {
  return standardBytes.startsWith(v, long ? uint8long : uint8short);
}

function validate(v: Uint8Array, long = false): boolean {
  const hex = encodeHex(v);
  return hex.startsWith(long ? '000000' : '00000');
}

await CTF.do(new CTFExecute());
