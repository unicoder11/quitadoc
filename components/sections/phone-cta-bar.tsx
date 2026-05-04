import Link from "next/link"
import { Phone, MessageCircle, Mail } from "lucide-react"

const PHONE = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent("Ola! Preciso de ajuda urgente com meu veiculo.")}`

interface PhoneCTABarProps {
  message?: string
  variant?: "primary" | "dark" | "accent"
}

export function PhoneCTABar({
  message = "Fale agora com um especialista — atendimento imediato",
  variant = "primary",
}: PhoneCTABarProps) {
  const bgClass =
    variant === "dark"
      ? "bg-foreground"
      : variant === "accent"
      ? "bg-accent"
      : "bg-primary"

  const textClass =
    variant === "accent" ? "text-accent-foreground" : "text-white"

  const borderClass =
    variant === "accent"
      ? "border-accent-foreground/20"
      : "border-white/20"

  return (
    <div className={`${bgClass} ${textClass} py-4`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row lg:px-8">
        <p className={`text-sm font-semibold sm:text-base ${variant === "accent" ? "text-accent-foreground" : "text-white/90"}`}>
          {message}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:+${PHONE}`}
            className={`flex items-center gap-2 rounded-full border ${borderClass} px-4 py-2 text-sm font-bold transition-all hover:scale-105`}
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-all hover:bg-[#20bb5a] hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="mailto:contato@quitadoc.com.br"
            className={`flex items-center gap-2 rounded-full border ${borderClass} px-4 py-2 text-sm font-bold transition-all hover:scale-105`}
          >
            <Mail className="h-4 w-4" />
            contato@quitadoc.com.br
          </a>
        </div>
      </div>
    </div>
  )
}
