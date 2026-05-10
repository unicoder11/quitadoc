import { FipeEmbedWidget } from '@/components/fipe/fipe-embed-widget'

export const metadata = {
  title: 'Embed FIPE - Adicione à seu site | QuitaDoc',
  description: 'Código de embed para adicionar a tabela FIPE ao seu site. Totalmente responsivo e atualizado diariamente.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function EmbedPage() {
  return <FipeEmbedWidget />
}
