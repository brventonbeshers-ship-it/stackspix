export const CONTRACT_ADDRESS = 'SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM'
export const CONTRACT_NAME = 'stackspix'
export const GRID_SIZE = 50
export const HIRO_API = 'https://api.hiro.so'


export function shortenAddress(addr: string, head = 6, tail = 4): string {
  if (!addr || addr.length < head + tail + 3) return addr;
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`;
}


export function formatSTX(microStx: number): string {
  return (microStx / 1_000_000).toFixed(2) + ' STX';
}
