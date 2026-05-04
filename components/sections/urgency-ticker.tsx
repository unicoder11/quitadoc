"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"

const PHONE = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

const alerts = [
  { text: "37 veículos apreendidos hoje no RJ — Proteja o seu agora", color: "red" },
  { text: "5 especialistas online agora — Resposta em 4 minutos", color: "green" },
  { text: "Liminar concedida em 24h para cliente de SP hoje", color: "green" },
  { text: "Prazo legal e curto — Cada hora conta para sua defesa", color: "red" },
]

export function UrgencyTicker() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % alerts.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const alert = alerts[current]

  return (
    <div className="w-full bg-[#0a0a0a] py-2 px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        {/* Rotating alerts */}
        <div className="flex items-center gap-6 overflow-hidden min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`h-2 w-2 rounded-full animate-pulse shrink-0 ${
                alert.color === "red" ? "bg-red-500" : "bg-green-400"
              }`}
            />
            <span className="text-xs font-medium text-white truncate">
              {alert.text}
            </span>
          </div>
        </div>

        {/* Phone CTA */}
        <a
          href={`tel:${PHONE}`}
          className="flex items-center gap-2 shrink-0 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 px-3 py-1 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition-colors"
        >
          <Phone className="h-3 w-3" />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Ligar</span>
        </a>
      </div>
    </div>
  )
}
