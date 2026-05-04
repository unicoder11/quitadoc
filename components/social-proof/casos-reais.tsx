"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote, MapPin, Calendar, TrendingDown } from "lucide-react"

const CASOS = [
  {
    id: 1,
    nome: "Carlos M.",
    cidade: "Rio de Janeiro, RJ",
    foto: null,
    tipo: "Financiamento Veicular",
    banco: "Santander",
    antes: 45000,
    depois: 18000,
    economia: 27000,
    percentual: 60,
    tempo: "18 dias",
    depoimento: "Estava prestes a perder meu carro que uso para trabalhar. A Quitadoc conseguiu negociar um desconto de 60% e ainda parcelou em 12x. Salvaram minha família.",
    data: "Janeiro 2024",
  },
  {
    id: 2,
    nome: "Maria S.",
    cidade: "São Paulo, SP",
    foto: null,
    tipo: "Cartão de Crédito",
    banco: "Nubank",
    antes: 28000,
    depois: 8400,
    economia: 19600,
    percentual: 70,
    tempo: "12 dias",
    depoimento: "Minha dívida com o Nubank estava me tirando o sono. Com a Quitadoc consegui 70% de desconto e voltei a dormir tranquila. Atendimento excelente!",
    data: "Fevereiro 2024",
  },
  {
    id: 3,
    nome: "Roberto L.",
    cidade: "Belo Horizonte, MG",
    foto: null,
    tipo: "Empréstimo Pessoal",
    banco: "Itaú",
    antes: 67000,
    depois: 26800,
    economia: 40200,
    percentual: 60,
    tempo: "23 dias",
    depoimento: "Eu achava que não tinha saída. Devia mais de 60 mil pro Itaú. A equipe da Quitadoc foi incrível e conseguiu reduzir mais da metade. Recomendo demais!",
    data: "Março 2024",
  },
  {
    id: 4,
    nome: "Ana Paula F.",
    cidade: "Curitiba, PR",
    foto: null,
    tipo: "Cheque Especial",
    banco: "Bradesco",
    antes: 15000,
    depois: 3750,
    economia: 11250,
    percentual: 75,
    tempo: "8 dias",
    depoimento: "75% de desconto no cheque especial! Eu não acreditei quando recebi a proposta. Processo rápido e sem burocracia. Muito obrigada Quitadoc!",
    data: "Abril 2024",
  },
  {
    id: 5,
    nome: "José Carlos R.",
    cidade: "Salvador, BA",
    foto: null,
    tipo: "Financiamento Veicular",
    banco: "BV Financeira",
    antes: 52000,
    depois: 23400,
    economia: 28600,
    percentual: 55,
    tempo: "21 dias",
    depoimento: "Minha moto ia para leilão em 15 dias. A Quitadoc entrou com defesa e conseguiu suspender o leilão e ainda negociar 55% de desconto. Profissionais de verdade.",
    data: "Maio 2024",
  },
  {
    id: 6,
    nome: "Fernanda M.",
    cidade: "Fortaleza, CE",
    foto: null,
    tipo: "Cartão de Crédito",
    banco: "C6 Bank",
    antes: 18500,
    depois: 5550,
    economia: 12950,
    percentual: 70,
    tempo: "10 dias",
    depoimento: "Estava negativada há 2 anos. Além de conseguir 70% de desconto, ainda limparam meu nome em menos de uma semana após o pagamento. Vida nova!",
    data: "Junho 2024",
  },
]

export function CasosReaisCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % CASOS.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + CASOS.length) % CASOS.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const caso = CASOS[currentIndex]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Casos <span className="text-primary">Reais</span> de Sucesso
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Veja como milhares de brasileiros já economizaram com a Quitadoc
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Card principal */}
          <div 
            className={`bg-card rounded-2xl border border-border shadow-lg overflow-hidden transition-opacity duration-300 ${isAnimating ? "opacity-50" : "opacity-100"}`}
          >
            <div className="grid lg:grid-cols-2">
              {/* Lado esquerdo - Depoimento */}
              <div className="p-8 lg:p-10">
                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  {`"${caso.depoimento}"`}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{caso.nome[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{caso.nome}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {caso.cidade}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lado direito - Numeros */}
              <div className="bg-primary/5 p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{caso.tipo}</p>
                    <p className="text-sm font-medium text-foreground">{caso.banco}</p>
                  </div>

                  <div className="flex items-end gap-4 py-4 border-y border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Devia</p>
                      <p className="text-xl font-semibold text-destructive line-through">
                        R$ {caso.antes.toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <TrendingDown className="h-6 w-6 text-success mb-1" />
                    <div>
                      <p className="text-xs text-muted-foreground">Pagou</p>
                      <p className="text-2xl font-bold text-success">
                        R$ {caso.depois.toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-success/10 text-center">
                    <p className="text-sm text-muted-foreground">Economia Total</p>
                    <p className="text-3xl font-bold text-success">
                      R$ {caso.economia.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-sm font-medium text-success">{caso.percentual}% de desconto</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {caso.data}
                    </span>
                    <span>Resolvido em {caso.tempo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navegacao */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-card border border-border hover:bg-secondary transition-colors"
              aria-label="Caso anterior"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            <div className="flex items-center gap-2">
              {CASOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Ir para caso ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-card border border-border hover:bg-secondary transition-colors"
              aria-label="Próximo caso"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Resumo total */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Esses {CASOS.length} clientes economizaram juntos{" "}
            <span className="font-bold text-success">
              R$ {CASOS.reduce((acc, c) => acc + c.economia, 0).toLocaleString("pt-BR")}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export function CasosReaisGrid() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Resultados <span className="text-primary">Comprovados</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mais de 12.000 clientes ja economizaram com a Quitadoc
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASOS.slice(0, 6).map((caso) => (
            <div key={caso.id} className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{caso.nome[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{caso.nome}</p>
                  <p className="text-sm text-muted-foreground">{caso.cidade}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{caso.tipo} - {caso.banco}</p>

              <div className="flex items-end justify-between p-3 rounded-lg bg-success/10 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Devia</p>
                  <p className="text-sm font-semibold text-destructive line-through">
                    R$ {caso.antes.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Pagou</p>
                  <p className="text-lg font-bold text-success">
                    R$ {caso.depois.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>

              <p className="text-center text-sm font-medium text-success">
                Economia de {caso.percentual}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
