import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'CommunityConnector | Make your street heard', description: 'Report, rally, and track the civic issues shaping your neighborhood.', generator: 'CommunityConnector V1' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f5f7f1', userScalable: true }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
