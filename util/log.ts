export function info(...message: string[]): void {
  console.info(...message);
}

export function checkpoint(...message: string[]): void {
  if (Deno.env.get('DEBUG') !== undefined) {
    console.debug(...message);
  }
}
