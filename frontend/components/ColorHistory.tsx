'use client';
import { useState, useEffect } from 'react';
const KEY = 'stackspix_color_history';
const MAX = 8;
export default function ColorHistory({ onSelect }: { onSelect: (c: string) => void }) {
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setColors(JSON.parse(s)); } catch {} }, []);
  if (!colors.length) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-gray-500">Recent</span>
      <div className="flex gap-1 flex-wrap">
        {colors.slice(0, MAX).map(c => (
          <button key={c} onClick={() => onSelect(c)} className="w-5 h-5 rounded-md border border-white/10 hover:scale-110 transition-transform" style={{ backgroundColor: `#${c}` }} title={`#${c}`} />
        ))}
      </div>
    </div>
  );
}
export function addToColorHistory(color: string) {
  try { const s = localStorage.getItem(KEY); let c: string[] = s ? JSON.parse(s) : []; c = [color, ...c.filter(x => x !== color)].slice(0, MAX); localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
}