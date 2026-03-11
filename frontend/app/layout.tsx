import type { Metadata } from 'next'
import './globals.css'
import { StacksProvider } from '../hooks/useStacks'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'StacksPix - On-chain Pixel Board',
  description: 'Paint pixels on the Stacks blockchain. Every pixel is a real on-chain transaction.',
  openGraph: {
    title: 'StacksPix',
    description: 'Paint pixels on the Stacks blockchain.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StacksProvider>
          <Header />
          {children}
        </StacksProvider>
      </body>
    </html>
  )
}
