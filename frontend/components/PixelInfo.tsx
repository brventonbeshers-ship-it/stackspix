'use client';
interface Props { x: number; y: number; color: string; owner: string; }
export default function PixelInfo({ x, y, color, owner }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md border border-white/20" style={{ backgroundColor: `#${color}` }} />
        <span className="text-sm font-mono text-white">#{color}</span>
      </div>
      <div className="text-xs font-mono text-gray-400">Position: ({x}, {y})</div>
      {owner && <div className="text-xs font-mono text-gray-500 truncate">Owner: {owner.slice(0, 8)}...{owner.slice(-4)}</div>}
    </div>
  );
}