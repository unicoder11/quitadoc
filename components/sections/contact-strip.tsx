import { Phone, MessageCircle, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

const PHONE = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

interface ContactStripProps {
  variant?: "dark" | "light" | "accent"
  title?: string
}

export function ContactStrip({ variant = "dark", title = "Precisa de ajuda agora?" }: ContactStripProps) {
  const bgClass = variant === "dark"
    ? "bg-primary text-primary-foreground"
    : variant === "accent"
    ? "bg-accent text-accent-foreground"
    : "bg-secondary text-foreground border border-border"

  return (
    <div className={`w-full py-4 px-4 ${bgClass}`}>
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold text-center sm:text-left">
          {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Ola! Preciso de ajuda urgente.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-2 text-sm font-semibold hover:bg-[#20bb5a] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="mailto:contato@quitadoc.com.br"
            className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <Mail className="h-4 w-4" />
            contato@quitadoc.com.br
          </a>
          <Link
            href="/consulta-gratuita"
            className="flex items-center gap-1 text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Consulta gratuita
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
