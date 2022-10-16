export function stringURLToHostname(url: string): string {
  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch (e) {
    hostname = "";
  }
  return hostname;
}

export function guidGenerator(): string {
  const S4 = (): string => {
    // eslint-disable-next-line no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
