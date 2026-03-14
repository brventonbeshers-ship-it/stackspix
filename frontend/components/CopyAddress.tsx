'use client';
import { useState } from 'react';
export default function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={copy} title="Copy address"
      className="text-xs text-gray-400 hover:text-purple-300 transition-colors px-2 py-1 rounded-lg hover:bg-purple-500/10">
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}