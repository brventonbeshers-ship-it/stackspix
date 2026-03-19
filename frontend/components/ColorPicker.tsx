'use client'

interface Props {
  selected: string
  onSelect: (color: string) => void
  customColor: string
  onCustomChange: (color: string) => void
}

const PALETTE = [
  'FF0000', 'FF6600', 'FFCC00', '00CC00', '0066FF', '9900FF',
  'FF66CC', 'FF9999', 'FFFF00', '00FF99', '00CCFF', 'CC00FF',
  'FFFFFF', 'CCCCCC', '888888', '444444', '222222', '000000',
]

export default function ColorPicker({ selected, onSelect, customColor, onCustomChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Palette</h3>

      <div className="grid grid-cols-6 gap-1.5">
        {PALETTE.map((c) => (
          <button
            key={c}
            title={`#${c}`}
            onClick={() => onSelect(c)}
            className={`w-7 h-7 rounded-md transition-all ${
              selected === c ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110' : 'hover:scale-105'
            }`}
            style={{ backgroundColor: `#${c}` }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-500">Manual</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={`#${customColor}`}
            onChange={(e) => {
              const hex = e.target.value.replace('#', '').toUpperCase()
              onCustomChange(hex)
              onSelect(hex)
            }}
            className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-white/10"
          />
          <span className="text-xs font-mono text-gray-400">#{selected}</span>
        </div>
      </div>

      <div
        className="w-full h-10 rounded-lg border border-white/10 mt-1"
        style={{ backgroundColor: `#${selected}` }}
      />
    </div>
  )
}
