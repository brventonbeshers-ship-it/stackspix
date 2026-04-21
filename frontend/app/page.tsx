'use client'

import { useState, useEffect, useCallback } from 'react'
import PixelCanvas from '../components/PixelCanvas'
import ColorPicker from '../components/ColorPicker'
import StatsPanel from '../components/StatsPanel'
import { useStacks } from '../hooks/useStacks'
import { fetchBoard, fetchUserCount, fetchTotalPlaced, Board } from '../lib/contracts'
import { GRID_SIZE } from '../lib/stacks'

const EMPTY_BOARD: Board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))

export default function Home() {
  const { address, connected } = useStacks()
  const [board, setBoard] = useState<Board>(EMPTY_BOARD)
  const [selectedColor, setSelectedColor] = useState('FF6600')
  const [customColor, setCustomColor] = useState('FF6600')
  const [total, setTotal] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [hoveredPixel, setHoveredPixel] = useState<{
    x: number; y: number; color: string; owner: string
  } | null>(null)

  const reload = useCallback(async () => {
    const [b, t] = await Promise.all([fetchBoard(), fetchTotalPlaced()])
    setBoard(b)
    setTotal(t)
    if (address) {
      const uc = await fetchUserCount(address)
      setUserCount(uc)
    }
  }, [address])

  useEffect(() => {
    reload()
    const interval = setInterval(reload, 45_000)
    return () => clearInterval(interval)
  }, [reload])

  return (
    <main className="flex items-start justify-center gap-6 p-6 min-h-[calc(100vh-65px)]">
      <aside className="w-48 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm sticky top-24">
        <ColorPicker
          selected={selectedColor}
          onSelect={setSelectedColor}
          customColor={customColor}
          onCustomChange={setCustomColor}
        />
      </aside>

      <div className="flex-shrink-0 flex flex-col items-center justify-start pt-2">
        <PixelCanvas
          board={board}
          selectedColor={selectedColor}
          connected={connected}
          onHover={setHoveredPixel}
          onPlaced={reload}
        />
      </div>

      <aside className="w-48 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm sticky top-24 min-h-[320px]">
        <StatsPanel
          total={total}
          userCount={userCount}
          hoveredPixel={hoveredPixel}
        />
      </aside>
    </main>
  )
}

// marker-page: 1775869471997

// marker-page: 1775918102139

// marker-page: 1775931293412

// marker-page: 1776007340504

// marker-page: 1776044688496

// marker-page: 1776060914885

// marker-page: 1776114009046

// marker-page: 1776141495780

// marker-page: 1776168755740

// marker-page: 1776183746220

// marker-page: 1776213354134

// marker-page: 1776245808178

// marker-page: 1776254222143

// marker-page: 1776267668883

// marker-page: 1776328929180

// marker-page: 1776347431687

// marker-page: 1776370864848

// marker-page: 1776398970188

// marker-page: 1776429690974

// marker-page: 1776476915995

// marker-page: 1776515691157

// marker-page: 1776582585154

// marker-page: 1776616573283

// marker-page: 1776641717451

// marker-page: 1776676558427

// marker-page: 1776698681655
