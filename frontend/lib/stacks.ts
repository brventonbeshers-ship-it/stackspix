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


export function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (days  > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins  > 0) return `${mins}m ago`;
  return 'just now';
}


export function pixelIndex(x: number, y: number): number {
  return y * GRID_SIZE + x;
}

export function indexToCoord(index: number): { x: number; y: number } {
  return { x: index % GRID_SIZE, y: Math.floor(index / GRID_SIZE) };
}
