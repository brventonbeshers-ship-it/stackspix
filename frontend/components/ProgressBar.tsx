interface Props { value: number; max: number; color?: string; label?: string; }
export default function ProgressBar({ value, max, color = 'from-purple-500 to-indigo-500', label }: Props) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div>
      {label && <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{label}</span><span>{pct.toFixed(0)}%</span></div>}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}