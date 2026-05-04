import type { Metadata } from 'next'
import './globals.css'
import { StacksProvider } from '../hooks/useStacks'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'StacksPix - On-chain Pixel Board',
  description: 'Draw on a shared 50x50 canvas — each pixel is stored on the Stacks blockchain.',
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

// marker-layout: 1776582504782

// marker-layout: 1776616576516

// marker-layout: 1776641616537

// marker-layout: 1776669602713

// marker-layout: 1776676483068

// marker-layout: 1776748762963

// marker-layout: 1776778114627

// marker-layout: 1776801568809

// marker-layout: 1776831483571

// marker-layout: 1776860256989

// marker-layout: 1776886906690

// marker-layout: 1776936285186

// marker-layout: 1776959412999

// marker-layout: 1776998830423

// marker-layout: 1777022347898

// marker-layout: 1777059533795

// marker-layout: 1777063715378

// marker-layout: 1777100451978

// marker-layout: 1777116487570

// marker-layout: 1777166423033

// marker-layout: 1777263490402

// marker-layout: 1777275926306

// marker-layout: 1777610508289

// marker-layout: 1777697197420

// marker-layout: 1777795669537
