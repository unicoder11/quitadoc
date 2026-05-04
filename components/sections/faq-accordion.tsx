"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
  blogLink?: { href: string; label: string }
}

interface FAQAccordionProps {
  title?: string
  subtitle?: string
  faqs: FAQ[]
  schemaEnabled?: boolean
}

export function FAQAccordion({ 
  title = "Perguntas Frequentes",
  subtitle = "Tire suas duvidas sobre nossos servicos",
  faqs,
  schemaEnabled = false
}: FAQAccordionProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <section className="bg-background py-16 lg:py-24">
      {schemaEnabled && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-foreground">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  {faq.blogLink && (
                    <Link
                      href={faq.blogLink.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {faq.blogLink.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
