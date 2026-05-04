"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "5511925332215"
  const message = encodeURIComponent("Ola! Preciso de ajuda com meu veiculo financiado.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366]"></span>
      </span>
    </a>
  )
}
