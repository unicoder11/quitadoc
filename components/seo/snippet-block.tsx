"use client"

import { cn } from "@/lib/utils"

interface SnippetBlockProps {
  question: string
  answer: string
  highlight?: string
  className?: string
}

export function SnippetBlock({ question, answer, highlight, className }: SnippetBlockProps) {
  return (
    <section 
      className={cn(
        "my-8 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8",
        className
      )}
      itemScope
      itemType="https://schema.org/Question"
    >
      <h2 
        className="mb-4 text-xl font-bold text-foreground md:text-2xl"
        itemProp="name"
      >
        {question}
      </h2>
      <div 
        itemScope 
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
      >
        <p 
          className="text-lg leading-relaxed text-muted-foreground"
          itemProp="text"
        >
          {highlight && (
            <strong className="text-primary">{highlight}</strong>
          )}{" "}
          {answer}
        </p>
      </div>
    </section>
  )
}

interface MultiSnippetBlockProps {
  questions: Array<{
    question: string
    answer: string
    highlight?: string
    type: "principal" | "secundaria" | "relacionada"
  }>
  className?: string
}

export function MultiSnippetBlock({ questions, className }: MultiSnippetBlockProps) {
  return (
    <div 
      className={cn("space-y-6", className)}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {questions.map((q, index) => (
        <section 
          key={index}
          className={cn(
            "rounded-xl border p-6",
            q.type === "principal" && "border-2 border-primary/30 bg-primary/5",
            q.type === "secundaria" && "border-secondary/30 bg-secondary/5",
            q.type === "relacionada" && "border-muted bg-muted/30"
          )}
          itemScope
          itemType="https://schema.org/Question"
          itemProp="mainEntity"
        >
          <div className="mb-2 flex items-center gap-2">
            {q.type === "principal" && (
              <span className="rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                Pergunta Principal
              </span>
            )}
            {q.type === "secundaria" && (
              <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                Saiba Mais
              </span>
            )}
            {q.type === "relacionada" && (
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Relacionado
              </span>
            )}
          </div>
          <h3 
            className="mb-3 text-lg font-bold text-foreground md:text-xl"
            itemProp="name"
          >
            {q.question}
          </h3>
          <div 
            itemScope 
            itemType="https://schema.org/Answer"
            itemProp="acceptedAnswer"
          >
            <p 
              className="leading-relaxed text-muted-foreground"
              itemProp="text"
            >
              {q.highlight && (
                <strong className="text-primary">{q.highlight}</strong>
              )}{" "}
              {q.answer}
            </p>
          </div>
        </section>
      ))}
    </div>
  )
}
