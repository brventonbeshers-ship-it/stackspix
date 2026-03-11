interface Props {
  label: string;
  variant?: 'purple' | 'indigo' | 'green' | 'gray';
}
const V = {
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  green:  'bg-green-500/20 text-green-300 border-green-500/30',
  gray:   'bg-white/10 text-gray-300 border-white/20',
};
export default function Badge({ label, variant = 'purple' }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${V[variant]}`}>
      {label}
    </span>
  );
}