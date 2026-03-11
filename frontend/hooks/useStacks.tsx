'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'

const appConfig = new AppConfig(['store_write', 'publish_data'])
export const userSession = new UserSession({ appConfig })

interface StacksCtx {
  address: string | null
  connected: boolean
  connect: () => void
  disconnect: () => void
}

const StacksContext = createContext<StacksCtx>({
  address: null,
  connected: false,
  connect: () => {},
  disconnect: () => {},
})

export function StacksProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData()
      setAddress(data.profile.stxAddress.mainnet)
    }
  }, [])

  const connect = () => {
    showConnect({
      appDetails: { name: 'StacksPix', icon: '/favicon.ico' },
      redirectTo: '/',
      onFinish: () => {
        const data = userSession.loadUserData()
        setAddress(data.profile.stxAddress.mainnet)
      },
      userSession,
    })
  }

  const disconnect = () => {
    userSession.signUserOut()
    setAddress(null)
  }

  return (
    <StacksContext.Provider value={{ address, connected: !!address, connect, disconnect }}>
      {children}
    </StacksContext.Provider>
  )
}

export function useStacks() {
  return useContext(StacksContext)
}
