import { Board } from './contracts';
import { GRID_SIZE } from './stacks';

export function getBoardStats(board: Board) {
  let filled = 0;
  const owners = new Set<string>();
  const colorCounts: Record<string, number> = {};

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const p = board[y]?.[x];
      if (p) {
        filled++;
        owners.add(p.owner);
        colorCounts[p.color] = (colorCounts[p.color] || 0) + 1;
      }
    }
  }

  const topColor = Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])[0];

  return {
    filled,
    empty: GRID_SIZE * GRID_SIZE - filled,
    uniqueOwners: owners.size,
    topColor: topColor ? topColor[0] : null,
    fillPercent: Math.round((filled / (GRID_SIZE * GRID_SIZE)) * 100),
  };
}