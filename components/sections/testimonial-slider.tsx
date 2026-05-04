"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  name: string
  location: string
  case: string
  result: string
  depoimento: string
  image?: string
  rating: number
  verificado: boolean
  data: string
  economia: string
}

interface TestimonialSliderProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Ricardo M. Santos",
    location: "São Paulo, SP",
    case: "Cancelamento de busca e apreensão de Honda Civic 2018",
    result: "Economizou R$ 38.000",
    depoimento: "Estava desesperado com 5 parcelas atrasadas. A Quitadoc analisou meu contrato e encontrou juros abusivos. Conseguiram cancelar a busca E reduzir minha parcela de R$ 1.850 para R$ 1.280. Incrível!",
    image: "/testimonials/ricardo.jpg",
    rating: 5,
    verificado: true,
    data: "Fevereiro 2026",
    economia: "R$ 38.000"
  },
  {
    name: "Ana Paula Oliveira",
    location: "Rio de Janeiro, RJ",
    case: "Revisão de contrato com redução de juros abusivos",
    result: "Reduziu parcela de R$ 1.200 para R$ 780",
    depoimento: "Pagava R$ 1.560/mês há 2 anos. A análise mostrou TAC ilegal e seguro duplicado. Consegui redução para R$ 980/mês e ainda recebi R$ 15.200 de volta. Equipe super profissional.",
    image: "/testimonials/ana.jpg",
    rating: 5,
    verificado: true,
    data: "Janeiro 2026",
    economia: "R$ 15.200"
  },
  {
    name: "Carlos Eduardo Lima",
    location: "Belo Horizonte, MG",
    case: "Defesa em leilão de Toyota Corolla 2020",
    result: "Recuperou veículo + R$ 15.000 em danos",
    depoimento: "Meu carro estava para ir a leilão. A Quitadoc entrou com ação e conseguiu ANULAR o leilão. Renegociamos a dívida com 60% de desconto. Recuperei meu carro e economizei muito.",
    image: "/testimonials/carlos.jpg",
    rating: 5,
    verificado: true,
    data: "Dezembro 2025",
    economia: "R$ 62.000"
  },
]

export function TestimonialSlider({ 
  title = "Casos de Sucesso",
  subtitle = "Veja o que nossos clientes dizem",
  testimonials = defaultTestimonials 
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-foreground">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="relative mt-12">
          {/* Desktop: Show all cards */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Mobile: Slider */}
          <div className="lg:hidden">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="h-10 w-10 rounded-full"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="h-10 w-10 rounded-full"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm border border-border hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <Quote className="h-8 w-8 text-accent opacity-50" />
        {testimonial.verificado && (
          <div className="text-blue-500 text-xs font-semibold">✓ Verificado</div>
        )}
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        {testimonial.image ? (
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.location}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>

      <p className="text-foreground italic mb-4 text-sm leading-relaxed">
        "{testimonial.depoimento}"
      </p>

      <div className="border-t border-border pt-4 space-y-2">
        <p className="text-sm text-foreground font-medium">{testimonial.case}</p>
        <div className="flex justify-between items-end">
          <p className="text-xs text-muted-foreground">{testimonial.data}</p>
          <p className="text-sm font-bold text-success">{testimonial.economia}</p>
        </div>
      </div>
    </div>
  )
}
