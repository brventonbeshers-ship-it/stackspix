import {
  callReadOnlyFunction,
  uintCV,
  principalCV,
  cvToJSON,
  stringAsciiCV,
} from "@stacks/transactions";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import {
  StacksPixConfig,
  PixelData,
  UserStats,
  GRID_SIZE,
  MAX_INDEX,
} from "./types";

export class StacksPixClient {
  private contractAddress: string;
  private contractName: string;
  private network: StacksMainnet | StacksTestnet;

  constructor(config: StacksPixConfig) {
    this.contractAddress = config.contractAddress;
    this.contractName = config.contractName;
    this.network =
      config.network === "testnet" ? new StacksTestnet() : new StacksMainnet();
  }

  /**
   * Get pixel data at coordinates (x, y).
   * Returns null if no pixel has been placed there.
   */
  async getPixel(x: number, y: number): Promise<PixelData | null> {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
      throw new Error(`Coordinates out of bounds: (${x}, ${y}). Must be 0-${GRID_SIZE - 1}`);
    }

    try {
      const result = await callReadOnlyFunction({
        network: this.network,
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: "get-pixel",
        functionArgs: [uintCV(x), uintCV(y)],
        senderAddress: this.contractAddress,
      });

      const json = cvToJSON(result);
      if (!json.value) return null;

      const val = json.value;
      return {
        color: val.color?.value ?? val.color ?? "",
        owner: val.owner?.value ?? val.owner ?? "",
        placedAt: parseInt(val["placed-at"]?.value ?? val["placed-at"] ?? "0"),
      };
    } catch {
      return null;
    }
  }

  /**
   * Get pixel data by flat index (0-2499).
   * Index = y * 50 + x.
   */
  async getPixelByIndex(index: number): Promise<PixelData | null> {
    if (index < 0 || index > MAX_INDEX) {
      throw new Error(`Index out of bounds: ${index}. Must be 0-${MAX_INDEX}`);
    }

    try {
      const result = await callReadOnlyFunction({
        network: this.network,
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: "get-pixel-by-index",
        functionArgs: [uintCV(index)],
        senderAddress: this.contractAddress,
      });

      const json = cvToJSON(result);
      if (!json.value) return null;

      const val = json.value;
      return {
        color: val.color?.value ?? val.color ?? "",
        owner: val.owner?.value ?? val.owner ?? "",
        placedAt: parseInt(val["placed-at"]?.value ?? val["placed-at"] ?? "0"),
      };
    } catch {
      return null;
    }
  }

  /**
   * Get total pixel count placed by a user.
   */
  async getUserStats(address: string): Promise<UserStats> {
    try {
      const result = await callReadOnlyFunction({
        network: this.network,
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: "get-user-count",
        functionArgs: [principalCV(address)],
        senderAddress: this.contractAddress,
      });

      const json = cvToJSON(result);
      const pixelCount = parseInt(json.value ?? json ?? "0");
      return { pixelCount };
    } catch {
      return { pixelCount: 0 };
    }
  }

  /**
   * Get the total number of pixels ever placed on the board.
   */
  async getTotalPlaced(): Promise<number> {
    try {
      const result = await callReadOnlyFunction({
        network: this.network,
        contractAddress: this.contractAddress,
        contractName: this.contractName,
        functionName: "get-total-placed",
        functionArgs: [],
        senderAddress: this.contractAddress,
      });

      const json = cvToJSON(result);
      return parseInt(json.value ?? json ?? "0");
    } catch {
      return 0;
    }
  }

  /**
   * Get the grid size (50x50).
   */
  getGridSize(): number {
    return GRID_SIZE;
  }

  /**
   * Build the function args needed for a place-pixel transaction.
   * Use with @stacks/connect openContractCall().
   */
  getPlacePixelArgs(x: number, y: number, color: string) {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
      throw new Error(`Coordinates out of bounds: (${x}, ${y})`);
    }
    if (color.length !== 6) {
      throw new Error("Color must be a 6-character hex string (e.g. 'ff0000')");
    }

    return {
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: "place-pixel",
      functionArgs: [uintCV(x), uintCV(y), stringAsciiCV(color)],
    };
  }
}
