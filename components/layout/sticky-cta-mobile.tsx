"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Phone, X, ChevronUp } from "lucide-react"

const WHATSAPP = "11925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

export function StickyCTAMobile() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY
      setScrollPosition(currentPosition)
      
      // Mostrar apos rolar 400px
      if (currentPosition > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Quero negociar minha dívida com desconto.")}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Barra expandida */}
      {isExpanded && (
        <div className="bg-card border-t border-border shadow-2xl px-4 py-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Fale com um especialista</p>
              <p className="text-xs text-muted-foreground">Análise em 2 minutos</p>
            </div>
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-full hover:bg-secondary"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#25D366] text-white"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm font-semibold">WhatsApp</span>
              <span className="text-xs opacity-80">Resposta imediata</span>
            </a>
            <a
              href={`tel:${WHATSAPP}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary text-primary-foreground"
            >
              <Phone className="h-6 w-6" />
              <span className="text-sm font-semibold">Ligar</span>
              <span className="text-xs opacity-80">{PHONE_DISPLAY}</span>
            </a>
          </div>

          {/* Microcopy agressivo */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Online agora
            </span>
            <span>Sem compromisso</span>
            <span>Sem impacto no score</span>
          </div>
        </div>
      )}

      {/* Barra compacta */}
      {!isExpanded && (
        <div className="bg-primary shadow-2xl">
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <MessageCircle className="h-6 w-6 text-primary-foreground" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-primary-foreground">Consulta Gratis</p>
                <p className="text-xs text-primary-foreground/70">Leva menos de 2 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary-foreground/80 font-medium">Falar agora</span>
              <ChevronUp className="h-5 w-5 text-primary-foreground" />
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
