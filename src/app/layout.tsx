import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Minha Seleção — Copa do Mundo 2026',
  description: 'Monte sua convocação e escalação da Seleção Brasileira para a Copa do Mundo 2026',
  openGraph: {
    title: 'Minha Seleção — Copa do Mundo 2026',
    description: 'Monte sua convocação e escalação da Seleção Brasileira',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
