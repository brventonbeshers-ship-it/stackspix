import type { Metadata } from 'next'
import './globals.css'
import { StacksProvider } from '../hooks/useStacks'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'StacksPix - On-chain Pixel Board',
  description: 'Place pixels permanently on Stacks blockchain. Every pixel is a real on-chain transaction.',
  openGraph: {
    title: 'StacksPix',
    description: 'On-chain pixel art powered by Stacks.',
    images: ['/og.png'],
  },
  other: {
    'talentapp:project_verification': 'e5e6c0b52b5ce9891d67ec21e6fc961ab3c52aedc5122935093613ddf3190243a3682de8d79f1efa4646ca4b360f879f8f53421f4e7c522d6fba56f74fe955b1',
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

// marker-layout: 1775869602219
