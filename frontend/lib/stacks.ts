import {
  StacksPixClient,
  GRID_SIZE as SDK_GRID_SIZE,
  MAX_INDEX,
} from "stacks-pix-sdk";
export type { PixelData, UserStats, StacksPixConfig } from "stacks-pix-sdk";

export const CONTRACT_ADDRESS = 'SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM'
export const CONTRACT_NAME = 'stackspix'
export const GRID_SIZE = SDK_GRID_SIZE
export const HIRO_API = 'https://api.hiro.so'
export { MAX_INDEX }

const client = new StacksPixClient({
  contractAddress: CONTRACT_ADDRESS,
  contractName: CONTRACT_NAME,
  network: "mainnet",
});

export const getPixel = (x: number, y: number) => client.getPixel(x, y);
export const getPixelByIndex = (index: number) => client.getPixelByIndex(index);
export const getUserStats = (address: string) => client.getUserStats(address);
export const getTotalPlaced = () => client.getTotalPlaced();
export const getPlacePixelArgs = (x: number, y: number, color: string) =>
  client.getPlacePixelArgs(x, y, color);


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


export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}


export function isValidHexColor(color: string): boolean {
  return /^[0-9A-Fa-f]{6}$/.test(color);
}


export function pluralize(n: number, word: string, plural?: string): string {
  return `${n} ${n === 1 ? word : (plural ?? word + 's')}`;
}


export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? '000000' : 'FFFFFF';
}

// marker-stacks: 1775869600030

// marker-stacks: 1775918226558

// marker-stacks: 1775931408997

// marker-stacks: 1775965010509

// marker-stacks: 1776007345677

// marker-stacks: 1776060937364

// marker-stacks: 1776113789570

// marker-stacks: 1776141685030

// marker-stacks: 1776168452673

// marker-stacks: 1776184102243

// marker-stacks: 1776213253524

// marker-stacks: 1776245655436

// marker-stacks: 1776267666693

// marker-stacks: 1776329089824

// marker-stacks: 1776370854268
