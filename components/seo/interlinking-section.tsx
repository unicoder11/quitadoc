import Link from "next/link"
import { ArrowRight, MapPin, Building2, FileText, AlertTriangle } from "lucide-react"

import tiposData from "@/data/tipos-divida.json"
import empresasData from "@/data/empresas.json"
import estadosData from "@/data/estados.json"
import cidadesData from "@/data/cidades.json"
import problemasData from "@/data/problemas-especificos.json"

interface InterlinkingSectionProps {
  currentTipo?: string
  currentEmpresa?: string
  currentEstado?: string
  currentProblema?: string
  showAll?: boolean
}

export function InterlinkingSection({
  currentTipo,
  currentEmpresa,
  currentEstado,
  currentProblema,
  showAll = false,
}: InterlinkingSectionProps) {
  const tipos = (tiposData as { slug: string; nome: string }[]).filter(t => t.slug !== currentTipo)
  const empresas = (empresasData as { slug: string; nome: string; tipo: string }[]).filter(e => e.slug !== currentEmpresa)
  const estados = (estadosData as { slug: string; nome: string }[]).filter(e => e.slug !== currentEstado)
  const cidades = (cidadesData as { slug: string; nome: string; estado: string }[])
  const problemas = (problemasData as { slug: string; nome: string }[]).filter(p => p.slug !== currentProblema)

  // Bancos e financeiras
  const bancos = empresas.filter(e => e.tipo === "banco" || e.tipo === "fintech")
  const financeiras = empresas.filter(e => e.tipo === "financeira")
  const varejo = empresas.filter(e => e.tipo === "varejo")
  const telecom = empresas.filter(e => e.tipo === "telecom")

  // Cidades por estado
  const cidadesPorEstado: Record<string, typeof cidades> = {}
  cidades.forEach(c => {
    if (!cidadesPorEstado[c.estado]) cidadesPorEstado[c.estado] = []
    cidadesPorEstado[c.estado].push(c)
  })

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          Navegacao Completa - Encontre sua Solucao
        </h2>

        {/* Por Tipo de Divida */}
        <div className="mb-12">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
            <FileText className="h-5 w-5 text-primary" />
            Por Tipo de Divida
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {tipos.slice(0, showAll ? 30 : 12).map((tipo) => (
              <Link
                key={tipo.slug}
                href={`/negociar-divida/${tipo.slug}`}
                className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm"
              >
                <span className="text-foreground">{tipo.nome}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Por Problema Especifico */}
        <div className="mb-12">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Por Problema Especifico
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {problemas.slice(0, showAll ? 30 : 10).map((problema) => (
              <Link
                key={problema.slug}
                href={`/problema/${problema.slug}`}
                className="p-3 rounded-lg bg-card border border-border hover:border-destructive hover:bg-destructive/5 transition-colors text-sm"
              >
                <span className="text-foreground">{problema.nome}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Por Banco/Financeira */}
        <div className="mb-12">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
            <Building2 className="h-5 w-5 text-primary" />
            Por Banco ou Financeira
          </h3>
          
          {/* Bancos principais */}
          <p className="text-sm text-muted-foreground mb-2">Bancos Tradicionais</p>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
            {bancos.filter(b => b.tipo === "banco").slice(0, showAll ? 20 : 8).map((banco) => (
              <Link
                key={banco.slug}
                href={`/negociar-divida/cartao-credito/${banco.slug}`}
                className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm text-center"
              >
                <span className="text-foreground">{banco.nome}</span>
              </Link>
            ))}
          </div>

          {/* Fintechs */}
          <p className="text-sm text-muted-foreground mb-2">Fintechs e Bancos Digitais</p>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
            {bancos.filter(b => b.tipo === "fintech").slice(0, showAll ? 20 : 8).map((banco) => (
              <Link
                key={banco.slug}
                href={`/negociar-divida/cartao-credito/${banco.slug}`}
                className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm text-center"
              >
                <span className="text-foreground">{banco.nome}</span>
              </Link>
            ))}
          </div>

          {/* Financeiras */}
          {financeiras.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground mb-2">Financeiras</p>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
                {financeiras.slice(0, showAll ? 20 : 6).map((fin) => (
                  <Link
                    key={fin.slug}
                    href={`/negociar-divida/emprestimo-pessoal/${fin.slug}`}
                    className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm text-center"
                  >
                    <span className="text-foreground">{fin.nome}</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Varejo */}
          {varejo.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground mb-2">Lojas e Varejo</p>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {varejo.slice(0, showAll ? 20 : 6).map((loja) => (
                  <Link
                    key={loja.slug}
                    href={`/negociar-divida/crediario/${loja.slug}`}
                    className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm text-center"
                  >
                    <span className="text-foreground">{loja.nome}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Por Estado */}
        <div className="mb-12">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            Por Estado
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {estados.slice(0, showAll ? 27 : 18).map((estado) => (
              <Link
                key={estado.slug}
                href={`/negociar-divida/cartao-credito/${estado.slug}`}
                className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm text-center"
              >
                <span className="text-foreground">{estado.nome}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Principais Cidades */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            Principais Cidades
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {cidades.slice(0, showAll ? 50 : 18).map((cidade) => (
              <Link
                key={cidade.slug}
                href={`/negociar-divida/cartao-credito/${cidade.slug}`}
                className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm"
              >
                <span className="text-foreground">{cidade.nome}</span>
                <span className="text-muted-foreground text-xs ml-1">({cidade.estado})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Links de Utilidade */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Links Uteis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/simulador" className="flex items-center gap-2 p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <span className="font-medium">Simulador de Divida</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/como-funciona" className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors">
              <span className="font-medium text-foreground">Como Funciona</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link href="/casos-de-sucesso" className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors">
              <span className="font-medium text-foreground">Casos de Sucesso</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link href="/calculadora-juros" className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors">
              <span className="font-medium text-foreground">Calculadora de Juros</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
