"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown, MessageCircle, Send } from "lucide-react"

const PHONE = "11925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

const quickOptions = [
  { label: "Meu veiculo foi apreendido", message: "Ola! Meu veiculo foi apreendido e preciso de ajuda urgente." },
  { label: "Recebi notificacao de busca", message: "Ola! Recebi uma notificacao de busca e apreensao e nao sei o que fazer." },
  { label: "Quero revisar meu contrato", message: "Ola! Gostaria de revisar meu contrato de financiamento para verificar juros abusivos." },
  { label: "Minha conta foi bloqueada", message: "Ola! Minha conta bancaria foi bloqueada judicialmente e preciso de orientacao." },
  { label: "Outro assunto", message: "Ola! Preciso de ajuda juridica relacionada ao meu financiamento." },
]

export function WhatsAppChat() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [showed, setShowed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowed(true)
      setOpen(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleOption = (message: string) => {
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  if (!showed) return null

  return (
    <>
      {/* Floating button when closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-2xl transition-transform hover:scale-105 focus:outline-none"
          aria-label="Abrir chat WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm font-semibold">Fale conosco</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-white" />
          </span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
                <MessageCircle className="h-5 w-5 text-white" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-[#075E54]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Quitadoc</p>
                <p className="text-xs text-green-300">Online agora — Resposta em 4 min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinimized(!minimized)}
                className="rounded p-1 text-white/70 hover:text-white transition-colors"
                aria-label="Minimizar"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${minimized ? "rotate-180" : ""}`} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1 text-white/70 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Chat body */}
              <div className="bg-[#ECE5DD] px-4 py-4 space-y-3">
                {/* Bot message */}
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#075E54]">
                    <MessageCircle className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-white px-4 py-3 shadow-sm">
                    <p className="text-xs font-semibold text-[#075E54] mb-1">Equipe Quitadoc</p>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      Ola! Como posso te ajudar? Selecione uma opcao abaixo ou nos envie uma mensagem.
                    </p>
                    <p className="text-xs text-gray-400 mt-1 text-right">agora</p>
                  </div>
                </div>

                {/* Urgency note */}
                <div className="mx-auto w-fit rounded-full bg-red-100 border border-red-200 px-3 py-1">
                  <p className="text-xs text-red-600 font-medium text-center">
                    Caso urgente? Ligue agora: {PHONE_DISPLAY}
                  </p>
                </div>
              </div>

              {/* Quick options */}
              <div className="bg-[#ECE5DD] px-4 pb-2 space-y-2">
                {quickOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleOption(opt.message)}
                    className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-2.5 text-left text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-[#25D366] hover:text-white group"
                  >
                    <span>{opt.label}</span>
                    <Send className="h-4 w-4 text-[#25D366] group-hover:text-white shrink-0" />
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-[#ECE5DD] px-4 pb-4 pt-2">
                <a
                  href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Ola! Preciso de ajuda.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Iniciar Conversa no WhatsApp
                </a>
                <p className="mt-2 text-center text-xs text-gray-500">
                  Respondemos em ate <strong>4 minutos</strong> em horario comercial
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
