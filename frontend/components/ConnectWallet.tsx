'use client'

import { useStacks } from '../hooks/useStacks'

export default function ConnectWallet() {
  const { address, connected, connect, disconnect } = useStacks()

  if (connected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 font-mono">
          {address.slice(0, 5)}...{address.slice(-5)}
        </span>
        <button
          onClick={disconnect}
          className="px-3 py-1.5 text-xs rounded-lg border border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400 transition-colors"
        >
          Unlink
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-purple-500 text-white transition-all shadow-lg shadow-purple-900/30"
    >
      Link Wallet
    </button>
  )
}
