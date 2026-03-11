import { CONTRACT_ADDRESS, CONTRACT_NAME, HIRO_API, GRID_SIZE } from './stacks'

export interface Pixel {
  color: string
  owner: string
  placedAt: number
}

export type Board = (Pixel | null)[][]

export async function fetchBoard(): Promise<Board> {
  const board: Board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(null)
  )

  try {
    let offset = 0
    const limit = 200
    let hasMore = true

    while (hasMore) {
      const res = await fetch(
        `${HIRO_API}/extended/v1/address/${CONTRACT_ADDRESS}.${CONTRACT_NAME}/transactions?limit=${limit}&offset=${offset}`
      )
      if (!res.ok) break
      const data = await res.json()
      const results = data.results ?? []

      for (const tx of results) {
        if (
          tx.tx_type !== 'contract_call' ||
          tx.contract_call?.function_name !== 'place-pixel' ||
          (tx.tx_status !== 'success' && tx.tx_status !== 'pending')
        ) continue

        const args = tx.contract_call.function_args
        if (!args || args.length < 3) continue

        const x = parseInt(args[0].repr.replace('u', ''))
        const y = parseInt(args[1].repr.replace('u', ''))
        const color = args[2].repr.replace(/^"/, '').replace(/"$/, '')
        const owner = tx.sender_address

        if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
          board[y][x] = { color, owner, placedAt: tx.burn_block_time ?? 0 }
        }
      }

      hasMore = results.length === limit
      offset += limit
      if (offset > 2000) break
    }

    // Also check mempool for pending transactions
    const mempoolRes = await fetch(
      `${HIRO_API}/extended/v1/tx/mempool?address=${CONTRACT_ADDRESS}.${CONTRACT_NAME}&limit=200`
    )
    if (mempoolRes.ok) {
      const mempoolData = await mempoolRes.json()
      for (const tx of mempoolData.results ?? []) {
        if (
          tx.tx_type !== 'contract_call' ||
          tx.contract_call?.function_name !== 'place-pixel'
        ) continue
        const args = tx.contract_call.function_args
        if (!args || args.length < 3) continue
        const x = parseInt(args[0].repr.replace('u', ''))
        const y = parseInt(args[1].repr.replace('u', ''))
        const color = args[2].repr.replace(/^"/, '').replace(/"$/, '')
        const owner = tx.sender_address
        if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
          board[y][x] = { color, owner, placedAt: 0 }
        }
      }
    }
  } catch (e) {
    console.error('fetchBoard error:', e)
  }

  return board
}

export async function fetchUserCount(address: string): Promise<number> {
  try {
    const res = await fetch(
      `${HIRO_API}/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-user-count`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: address, arguments: [`0x051a${Buffer.from(address).toString('hex')}`] }),
      }
    )
    // fallback: count from tx history
    const txRes = await fetch(
      `${HIRO_API}/extended/v1/address/${CONTRACT_ADDRESS}.${CONTRACT_NAME}/transactions?limit=200`
    )
    if (!txRes.ok) return 0
    const data = await txRes.json()
    return (data.results ?? []).filter(
      (tx: any) =>
        tx.tx_type === 'contract_call' &&
        tx.contract_call?.function_name === 'place-pixel' &&
        tx.tx_status === 'success' &&
        tx.sender_address === address
    ).length
  } catch {
    return 0
  }
}

export async function fetchTotalPlaced(): Promise<number> {
  try {
    const res = await fetch(
      `${HIRO_API}/extended/v1/address/${CONTRACT_ADDRESS}.${CONTRACT_NAME}/transactions?limit=1`
    )
    if (!res.ok) return 0
    const data = await res.json()
    return data.total ?? 0
  } catch {
    return 0
  }
}
