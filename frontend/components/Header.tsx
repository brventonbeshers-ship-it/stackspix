'use client'

import ConnectWallet from './ConnectWallet'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600 grid grid-cols-2 gap-px p-1.5.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-sm bg-white/80" />
          ))}
        </div>
        <span className="text-base font-bold tracking-tight text-white">
          Stacks<span className="text-indigo-300">Pix</span>
        </span>
      </div>
      <ConnectWallet />
    </header>
  )
}
