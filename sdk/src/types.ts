export interface PixelData {
  color: string;
  owner: string;
  placedAt: number;
}

export interface UserStats {
  pixelCount: number;
}

export interface StacksPixConfig {
  contractAddress: string;
  contractName: string;
  network?: "mainnet" | "testnet";
}

export const GRID_SIZE = 50;
export const MAX_INDEX = 2499;
