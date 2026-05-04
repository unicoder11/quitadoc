"use client"

import { ExternalLink } from "lucide-react"

const FORM_URL = "https://forms.gle/Htxzv3dHhKJomPQa9"

const MICROCOPY = [
  "Sem custo inicial",
  "Resposta rápida",
  "87% de sucesso",
]

interface FormCTAProps {
  heading: string
  subheading?: string
  buttonText: string
  variant?: "hero" | "mid" | "final" | "inline"
}

export function FormCTA({
  heading,
  subheading,
  buttonText,
  variant = "inline",
}: FormCTAProps) {
  const isHero = variant === "hero"
  const isFinal = variant === "final"
  const isMid = variant === "mid"

  return (
    <div
      className={[
        "flex flex-col items-center gap-4 text-center",
        isHero && "rounded-2xl bg-card p-6 shadow-2xl",
        isMid && "rounded-2xl bg-primary/5 border border-primary/10 p-8",
        isFinal && "rounded-2xl bg-destructive/5 border border-destructive/20 p-8",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className={[
        "font-bold text-balance leading-tight",
        isHero ? "text-xl text-card-foreground" : "text-2xl text-foreground",
        isFinal && "text-destructive",
      ].filter(Boolean).join(" ")}>
        {heading}
      </p>

      {subheading && (
        <p className="text-sm text-muted-foreground max-w-sm">
          {subheading}
        </p>
      )}

      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "inline-flex items-center gap-2 rounded-full font-bold transition-all hover:scale-105 shadow-lg",
          isHero || isMid
            ? "bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-base"
            : isFinal
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 px-8 py-4 text-base"
            : "bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-sm",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <ExternalLink className="h-4 w-4 shrink-0" />
        {buttonText}
      </a>

      {/* Microcopy */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {MICROCOPY.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            <span className="text-success font-bold">&#10003;</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
