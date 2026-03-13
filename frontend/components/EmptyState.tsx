interface Props { title: string; description?: string; }
export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 grid grid-cols-4 gap-px p-2 mb-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="rounded-sm bg-white/10" />
        ))}
      </div>
      <p className="font-semibold text-gray-200 text-lg">{title}</p>
      {description && <p className="text-sm text-gray-400 mt-2 max-w-xs">{description}</p>}
    </div>
  );
}