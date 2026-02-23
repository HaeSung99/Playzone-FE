import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'My Company',
  description: 'Welcome to our company',
}

import ConditionalLayout from './components/ConditionalLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
} 