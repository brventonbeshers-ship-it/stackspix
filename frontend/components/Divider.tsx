export default function Divider({ label }: { label?: string }) {
  if (!label) return <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-6" />;
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/30" />
      <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-500/30" />
    </div>
  );
}