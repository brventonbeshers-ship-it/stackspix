'use client';
import { useState } from 'react';
interface Props { text: string; children: React.ReactNode; }
export default function Tooltip({ text, children }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/95 border border-white/10 rounded-xl text-xs text-gray-200 whitespace-nowrap shadow-xl z-50 animate-fade-in">
          {text}
        </div>
      )}
    </div>
  );
}