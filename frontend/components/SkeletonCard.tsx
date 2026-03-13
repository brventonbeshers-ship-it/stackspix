export default function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse space-y-3">
      <div className="h-4 bg-white/10 rounded-full w-2/5" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 bg-white/10 rounded-full w-full" />
          <div className="h-3 bg-white/[0.07] rounded-full w-3/4" />
        </div>
      ))}
    </div>
  );
}