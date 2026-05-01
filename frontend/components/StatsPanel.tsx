'use client'

interface Props {
  total: number
  userCount: number
  hoveredPixel: { x: number; y: number; color: string; owner: string } | null
}

export default function StatsPanel({ total, userCount, hoveredPixel }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Stats</h3>

      <div className="flex flex-col gap-2">
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="text-2xl font-bold text-white">{total.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-0.5">Pixels placed total</div>
        </div>

        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="text-2xl font-bold text-purple-400">{userCount.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-0.5">Your pixels</div>
        </div>

        <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="text-2xl font-bold text-indigo-400">2,500</div>
          <div className="text-xs text-gray-500 mt-0.5">Available cells</div>
        </div>
      </div>

      {hoveredPixel && (
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-1.5">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Hover</div>
          <div className="text-xs font-mono text-gray-300">
            x: {hoveredPixel.x}, y: {hoveredPixel.y}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: `#${hoveredPixel.color}` }}
            />
            <span className="text-xs font-mono text-gray-300">#{hoveredPixel.color}</span>
          </div>
          {hoveredPixel.owner && (
            <div className="text-xs font-mono text-gray-500 truncate">
              {hoveredPixel.owner.slice(0, 9)}...
            </div>
          )}
        </div>
      )}

      <div className="mt-auto text-xs text-gray-600 leading-relaxed">
        Click any cell to place your pixel on the Stacks blockchain.
      </div>
    </div>
  )
}
