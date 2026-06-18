import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '¿Qué hago hoy? — Tu plan perfecto en segundos',
  description:
    'Dinos tu ciudad, tiempo libre y presupuesto. La IA genera 3 planes concretos y personalizados en segundos. Deja de perder el tiempo decidiendo.',
  keywords: ['qué hacer hoy', 'planes de ocio', 'actividades', 'IA', 'planes personalizados', 'tiempo libre'],
  openGraph: {
    title: '¿Qué hago hoy? — Tu plan perfecto en segundos',
    description: 'Dinos tu ciudad, tiempo y presupuesto. 3 planes personalizados en segundos.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Qué hago hoy?',
    description: 'Tu plan perfecto en segundos gracias a la IA',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
