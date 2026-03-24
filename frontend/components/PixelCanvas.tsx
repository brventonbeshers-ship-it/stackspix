'use client'

import { useEffect, useRef, useState } from 'react'
import { openContractCall } from '@stacks/connect'
import { uintCV, stringAsciiCV } from '@stacks/transactions'
import { StacksMainnet } from '@stacks/network'
import { CONTRACT_ADDRESS, CONTRACT_NAME, GRID_SIZE } from '../lib/stacks'
const network = new StacksMainnet()
import { Board } from '../lib/contracts'
import { userSession } from '../hooks/useStacks'

const CELL = 12
const CANVAS_SIZE = GRID_SIZE * CELL // 500px

interface Props {
  board: Board
  selectedColor: string
  connected: boolean
  onHover: (info: { x: number; y: number; color: string; owner: string } | null) => void
  onPlaced: () => void
}

export default function PixelCanvas({ board, selectedColor, connected, onHover, onPlaced }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [placing, setPlacing] = useState(false)
  const [optimistic, setOptimistic] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const pixel = board[y]?.[x]
        const optColor = optimistic.get(`${x},${y}`)
        ctx.fillStyle = optColor ? `#${optColor}` : pixel ? `#${pixel.color}` : '#12122a'
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
        ctx.strokeStyle = 'rgba(255,255,255,0.26)'
        ctx.lineWidth = 0.7
        ctx.strokeRect(x * CELL, y * CELL, CELL, CELL)
      }
    }
  }, [board, optimistic])

  const getCellFromEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / CELL)
    const y = Math.floor((e.clientY - rect.top) / CELL)
    return { x, y }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCellFromEvent(e)
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) { onHover(null); return }
    const pixel = board[y]?.[x]
    onHover({ x, y, color: pixel?.color ?? '1a1a2e', owner: pixel?.owner ?? '' })
  }

  const handleClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!connected || placing) return
    const { x, y } = getCellFromEvent(e)
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return

    setPlacing(true)
    const capturedX = x
    const capturedY = y
    const capturedColor = selectedColor
    try {
      await openContractCall({
        network,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'place-pixel',
        functionArgs: [uintCV(capturedX), uintCV(capturedY), stringAsciiCV(capturedColor)],
        postConditions: [],
        onFinish: () => {
          setOptimistic(prev => new Map(prev).set(`${capturedX},${capturedY}`, capturedColor))
          setPlacing(false)
          onPlaced()
        },
        onCancel: () => setPlacing(false),
        userSession,
      })
    } catch {
      setPlacing(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => onHover(null)}
          onClick={handleClick}
          className={`block ${connected ? 'cursor-crosshair' : 'cursor-not-allowed'}`}
        />
        {placing && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
            <div className="text-white text-sm font-mono animate-pulse">Submitting transaction...</div>
          </div>
        )}
        {!connected && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <div className="text-gray-300 text-sm font-mono">Sign in to paint pixels</div>
          </div>
        )}
      </div>
      <div className="text-xs text-gray-600 font-mono">Each pixel is a real blockchain transaction</div>
    </div>
  )
}
