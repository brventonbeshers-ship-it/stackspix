'use client';
interface Props { icon: string; label: string; onClick: () => void; disabled?: boolean; }
export default function IconButton({ icon, label, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={label} title={label}
      className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/30 transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
      <span className="text-base">{icon}</span>
    </button>
  );
}