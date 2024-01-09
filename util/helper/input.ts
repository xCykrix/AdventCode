export function getInputAsString(file: string): string {
  return Deno.readTextFileSync(file).trim();
}

export function getInputAsSeparatedString(file: string, separator = ''): string[] {
  return Deno.readTextFileSync(file).trim().split(separator);
}

export function getInputAsList(file: string): string[] {
  return Deno.readTextFileSync(file).trim().split('\n');
}

export function getInputAsSeparatedList(file: string, separator = ''): string[][] {
  return getInputAsList(file).map((v) => v.split(separator))
}

