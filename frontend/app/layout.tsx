import type { Metadata } from 'next'
import './globals.css'
import { StacksProvider } from '../hooks/useStacks'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'StacksPix - On-chain Pixel Board',
  description: 'Paint pixels on the Stacks blockchain. Every pixel is a real on-chain transaction.',
  openGraph: {
    title: 'StacksPix',
    description: 'Collaborative pixel canvas on Stacks.',
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

// marker-layout: 1775918092774

// marker-layout: 1775931139606

// marker-layout: 1775964898957

// marker-layout: 1776007350044

// marker-layout: 1776044683316

// marker-layout: 1776060842442

// marker-layout: 1776113850109

// marker-layout: 1776168752384

// marker-layout: 1776183935304
