import type { Metadata } from 'next'
import './globals.css'
import { StacksProvider } from '../hooks/useStacks'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'StacksPix - On-chain Pixel Board',
  description: 'On-chain pixel art on Stacks. Place, overwrite, and collect pixels permanently.',
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

// marker-layout: 1775918092774

// marker-layout: 1775931139606

// marker-layout: 1775964898957

// marker-layout: 1776007350044

// marker-layout: 1776044683316

// marker-layout: 1776060842442

// marker-layout: 1776113850109

// marker-layout: 1776168752384

// marker-layout: 1776183935304

// marker-layout: 1776213315257

// marker-layout: 1776245671378

// marker-layout: 1776267674103

// marker-layout: 1776313367620

// marker-layout: 1776329055527

// marker-layout: 1776370640910

// marker-layout: 1776429563158

// marker-layout: 1776457173722

// marker-layout: 1776476997430

// marker-layout: 1776491025060

// marker-layout: 1776515478335
