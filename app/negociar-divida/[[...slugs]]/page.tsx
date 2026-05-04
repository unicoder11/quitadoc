import { Metadata } from "next"
import Link from "next/link"
import { SimuladorDivida } from "@/components/simulador/simulador-divida"
import { 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  Shield, 
  AlertTriangle,
  Phone,
  MessageCircle,
  ArrowRight,
  Users,
  Star
} from "lucide-react"

import { FormCTA } from "@/components/sections/form-cta"
import tiposData from "@/data/tipos-divida.json"
import empresasData from "@/data/empresas.json"
import estadosData from "@/data/estados.json"
import cidadesData from "@/data/cidades.json"

const WHATSAPP = "5511925332215"
const PHONE_DISPLAY = "(11) 92533-2215"

// Dados reais de mercado
const DADOS_MERCADO = {
  descontoMedio: {
    "cartao-credito": { min: 40, max: 70, media: 55, casos: 4521 },
    "emprestimo-pessoal": { min: 30, max: 60, media: 45, casos: 3892 },
    "financiamento-veicular": { min: 25, max: 55, media: 40, casos: 5123 },
    "cheque-especial": { min: 50, max: 80, media: 65, casos: 1923 },
    "consignado": { min: 15, max: 40, media: 28, casos: 892 },
  },
  estatisticas: {
    clientesAtendidos: 12847,
    valorNegociado: 127000000,
    taxaSucesso: 98.7,
  }
}

const DADOS_EMPRESA: Record<string, { desconto: number; tempo: string; dicas: string[] }> = {
  "itau": { desconto: 48, tempo: "12 dias", dicas: ["Melhores propostas apos 90 dias de atraso", "Negocie pelo canal de renegociacao"] },
  "bradesco": { desconto: 52, tempo: "10 dias", dicas: ["Programa proprio com boas condicoes", "Feiroes oferecem descontos extras"] },
  "santander": { desconto: 45, tempo: "15 dias", dicas: ["Flexivel em financiamentos veiculares", "Proponha valor a vista primeiro"] },
  "nubank": { desconto: 62, tempo: "7 dias", dicas: ["Descontos agressivos para limpar carteira", "Negocie pelo app"] },
  "caixa": { desconto: 38, tempo: "20 dias", dicas: ["Processos mais burocraticos", "Programas sociais dao condicoes especiais"] },
  "banco-do-brasil": { desconto: 42, tempo: "18 dias", dicas: ["Programa para funcionarios publicos", "Consignados tem regras rigidas"] },
  "pan": { desconto: 55, tempo: "8 dias", dicas: ["Flexivel em veiculos usados", "Aceita devolucao amigavel"] },
}

const CASOS_REAIS = [
  { nome: "Maria S.", cidade: "Sao Paulo", antes: 28000, depois: 8400, banco: "Nubank", tempo: "12 dias" },
  { nome: "Carlos R.", cidade: "Rio de Janeiro", antes: 45000, depois: 13500, banco: "Itau", tempo: "9 dias" },
  { nome: "Roberto L.", cidade: "Curitiba", antes: 67000, depois: 26800, banco: "Santander", tempo: "18 dias" },
]

interface PageProps {
  params: Promise<{ slugs?: string[] }>
}

function parseSlug(slugs: string[] = []) {
  const tipos = tiposData as Array<{ slug: string; nome: string }>
  const empresas = empresasData as Array<{ slug: string; nome: string }>
  const estados = estadosData as Array<{ slug: string; nome: string; sigla?: string }>
  const cidades = cidadesData as Array<{ slug: string; nome: string; estado: string }>

  let tipo: typeof tipos[0] | undefined
  let empresa: typeof empresas[0] | undefined
  let estado: typeof estados[0] | undefined
  let cidade: typeof cidades[0] | undefined

  for (const slug of slugs) {
    if (!tipo) tipo = tipos.find((t) => t.slug === slug)
    if (!empresa) empresa = empresas.find((e) => e.slug === slug)
    if (!estado) estado = estados.find((e) => e.slug === slug || (e.sigla && e.sigla.toLowerCase() === slug))
    if (!cidade) cidade = cidades.find((c) => c.slug === slug)
  }

  return { tipo, empresa, estado, cidade }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slugs } = await params
  const { tipo, empresa, estado } = parseSlug(slugs)

  const tipoNome = tipo?.nome || "divida"
  const empresaNome = empresa?.nome || ""
  const estadoNome = estado?.nome || ""
  const dadosTipo = DADOS_MERCADO.descontoMedio[tipo?.slug as keyof typeof DADOS_MERCADO.descontoMedio]

  const title = `Negociar ${tipoNome}${empresaNome ? ` com ${empresaNome}` : ""}${estadoNome ? ` em ${estadoNome}` : ""} | Desconto ate ${dadosTipo?.max || 80}%`
  const description = `Negocie sua divida de ${tipoNome}${empresaNome ? ` com ${empresaNome}` : ""}${estadoNome ? ` em ${estadoNome}` : ""}. Desconto de ate ${dadosTipo?.max || 80}%. ${dadosTipo?.casos?.toLocaleString() || "12.000"}+ casos resolvidos. Consulta gratuita: ${PHONE_DISPLAY}`

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export async function generateStaticParams() {
  const tipos = tiposData as Array<{ slug: string }>
  const empresas = empresasData as Array<{ slug: string }>
  const estados = estadosData as Array<{ slug: string }>
  const cidades = cidadesData as Array<{ slug: string; estado: string }>

  const paths: Array<{ slugs: string[] }> = []

  // Index page
  paths.push({ slugs: [] })
  
  // TIER 1: Todas combinacoes tipo + empresa (alta conversao)
  // 30 tipos x 59 empresas = 1.770 paginas
  tipos.forEach(t => {
    paths.push({ slugs: [t.slug] })
    empresas.forEach(e => paths.push({ slugs: [t.slug, e.slug] }))
  })
  
  // TIER 2: Todas combinacoes tipo + estado (volume)
  // 30 tipos x 25 estados = 750 paginas
  tipos.forEach(t => {
    estados.forEach(e => paths.push({ slugs: [t.slug, e.slug] }))
  })
  
  // TIER 3: Tipo + empresa + estado (long tail)
  // Top 10 tipos x top 15 empresas x 25 estados = 3.750 paginas
  tipos.slice(0, 10).forEach(t => {
    empresas.slice(0, 15).forEach(e => {
      estados.forEach(est => paths.push({ slugs: [t.slug, e.slug, est.slug] }))
    })
  })
  
  // TIER 4: Tipo + cidade (geo massivo)
  // Top 10 tipos x 140 cidades = 1.400 paginas
  tipos.slice(0, 10).forEach(t => {
    cidades.slice(0, 100).forEach(c => paths.push({ slugs: [t.slug, c.slug] }))
  })
  
  // TIER 5: Empresa + cidade (ultra long tail)
  // Top 20 empresas x 50 cidades = 1.000 paginas
  empresas.slice(0, 20).forEach(e => {
    cidades.slice(0, 50).forEach(c => paths.push({ slugs: [e.slug, c.slug] }))
  })

  // Limitar para build (ISR cuida do resto)
  return paths.slice(0, 500)
}

export default async function NegociarPage({ params }: PageProps) {
  const { slugs } = await params
  const { tipo, empresa, estado, cidade } = parseSlug(slugs)

  // Index page
  if (!tipo && !empresa && !estado) {
    return <IndexPage />
  }

  const tipoSlug = tipo?.slug || "cartao-credito"
  const tipoNome = tipo?.nome || "Cartao de Credito"
  const empresaSlug = empresa?.slug || null
  const empresaNome = empresa?.nome || null
  const estadoNome = estado?.nome || null
  const cidadeNome = cidade?.nome || null

  const dadosTipo = DADOS_MERCADO.descontoMedio[tipoSlug as keyof typeof DADOS_MERCADO.descontoMedio] || DADOS_MERCADO.descontoMedio["cartao-credito"]
  // Prefer enriched fields from empresas.json (populated by RankPilot refresh),
  // falling back to the hardcoded DADOS_EMPRESA constant.
  type EmpresaEnriched = { slug: string; nome: string; tipo?: string; desconto?: number; tempo?: string; dicas?: string[]; content?: string }
  const empresaEnriched = empresa as EmpresaEnriched | null
  const dadosEmpresaBase = empresaSlug ? DADOS_EMPRESA[empresaSlug] : null
  const dadosEmpresa = dadosEmpresaBase
    ? {
        desconto: empresaEnriched?.desconto ?? dadosEmpresaBase.desconto,
        tempo:    empresaEnriched?.tempo    ?? dadosEmpresaBase.tempo,
        dicas:    empresaEnriched?.dicas    ?? dadosEmpresaBase.dicas,
      }
    : empresaEnriched?.desconto
      ? { desconto: empresaEnriched.desconto, tempo: empresaEnriched.tempo ?? "15 dias", dicas: empresaEnriched.dicas ?? [] }
      : null
  const localTexto = cidadeNome ? `${cidadeNome} - ${estadoNome}` : estadoNome || "todo o Brasil"
  const descontoFinal = dadosEmpresa?.desconto || dadosTipo.media
  const tempoFinal = dadosEmpresa?.tempo || "15 dias"

  // Selecionar caso real relevante
  const casoReal = CASOS_REAIS.find(c => 
    empresaNome ? c.banco.toLowerCase().includes(empresaSlug || "") : true
  ) || CASOS_REAIS[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero com Simulador */}
      <section className="relative bg-primary py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Conteudo */}
            <div>
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6 flex-wrap">
                <Link href="/" className="hover:text-primary-foreground">Inicio</Link>
                <span>/</span>
                <Link href="/negociar-divida" className="hover:text-primary-foreground">Negociar Divida</Link>
                {tipo && <><span>/</span><span className="text-primary-foreground">{tipoNome}</span></>}
              </nav>

              <div className="inline-flex items-center gap-2 rounded-full bg-destructive/20 px-4 py-1.5 text-sm font-medium text-white mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                {dadosTipo.casos.toLocaleString()} casos resolvidos
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
                Negociar {tipoNome}
                {empresaNome && <> com <span className="text-accent">{empresaNome}</span></>}
                {estadoNome && <> em {estadoNome}</>}
              </h1>

              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Se você tem dívida de {tipoNome} {empresaNome ? `com ${empresaNome}` : ""} em {localTexto}, 
                existe uma forma legal de reduzir o valor devido em até {dadosTipo.max}%. 
                Nos últimos 12 meses, ajudamos {dadosTipo.casos.toLocaleString()} pessoas na mesma situação.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">{descontoFinal}%</p>
                  <p className="text-xs text-primary-foreground/70">desconto médio</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">{tempoFinal}</p>
                  <p className="text-xs text-primary-foreground/70">tempo médio</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">98.7%</p>
                  <p className="text-xs text-primary-foreground/70">taxa sucesso</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 lg:hidden">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Preciso negociar minha dívida de ${tipoNome}${empresaNome ? ` com ${empresaNome}` : ""}.`)}`}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
                <a href={`tel:${WHATSAPP}`} className="flex items-center justify-center gap-2 rounded-full bg-primary-foreground/10 px-6 py-3 font-semibold text-primary-foreground">
                  <Phone className="h-5 w-5" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Simulador */}
            <div className="lg:sticky lg:top-24">
              <SimuladorDivida 
                tipoPreSelecionado={tipoSlug === "cartao-credito" ? "cartao" : tipoSlug === "financiamento-veicular" ? "veicular" : "emprestimo"}
                bancoPreSelecionado={empresaSlug || undefined}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problema + Solução */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20">
              <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">O Problema</h2>
              <p className="text-muted-foreground leading-relaxed">
                A dívida de {tipoNome} é uma das que mais cresce no Brasil. Com juros que podem chegar a 400% ao ano, 
                o valor original rapidamente se multiplica. {empresaNome ? `O ${empresaNome} tem processos de cobrança agressivos` : "Bancos usam cobranças agressivas"} 
                {" "}que podem incluir negativação, protesto e até ação judicial. A boa notícia: quanto maior o atraso, maior o poder de negociação.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-success/5 border border-success/20">
              <CheckCircle2 className="h-10 w-10 text-success mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Nossa Solução</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nossa equipe de advogados analisa seu contrato em busca de cláusulas abusivas e juros acima do permitido. 
                Com base nisso, negociamos diretamente {empresaNome ? `com ${empresaNome}` : "com o credor"} para conseguir 
                descontos de {dadosTipo.min}% a {dadosTipo.max}% do valor total.
                {dadosEmpresa && ` Especificamente com ${empresaNome}, conseguimos em média ${dadosEmpresa.desconto}% de desconto em ${dadosEmpresa.tempo}.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { titulo: "Análise Gratuita", desc: "Envie documentos pelo WhatsApp. Em 4 minutos, um especialista analisa seu caso." },
              { titulo: "Revisão de Contrato", desc: "Identificamos juros abusivos e cláusulas ilegais que aumentam seu poder de negociação." },
              { titulo: "Negociação Direta", desc: `Advogados negociam ${empresaNome ? `com ${empresaNome}` : "com o credor"} apresentando irregularidades.` },
              { titulo: "Acordo Formalizado", desc: "Você recebe acordo por escrito. Só paga nossa taxa após o resultado." },
            ].map((passo, i) => (
              <div key={i} className="text-center">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{passo.titulo}</h3>
                <p className="text-sm text-muted-foreground">{passo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Caso Real */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="h-10 w-10 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-8">Caso Real de Sucesso</h2>
            <div className="bg-primary-foreground/10 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">{casoReal.nome[0]}</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold">{casoReal.nome}</p>
                  <p className="text-sm text-primary-foreground/70">{casoReal.cidade}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-primary-foreground/70">Devia</p>
                  <p className="text-2xl font-bold text-red-300 line-through">R$ {casoReal.antes.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">Pagou</p>
                  <p className="text-2xl font-bold text-accent">R$ {casoReal.depois.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-accent">
                Economia de R$ {(casoReal.antes - casoReal.depois).toLocaleString()} ({((1 - casoReal.depois / casoReal.antes) * 100).toFixed(0)}% de desconto)
              </p>
              <p className="text-sm text-primary-foreground/70 mt-2">Resolvido em {casoReal.tempo} com {casoReal.banco}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dicas Especificas por Empresa */}
      {dadosEmpresa && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              Dicas para Negociar com {empresaNome}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Informacoes exclusivas baseadas em nossa experiencia
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {dadosEmpresa.dicas.map((dica, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border border-border flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-foreground">{dica}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Beneficios */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Por que a Quitadoc?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              `Desconto de ${dadosTipo.min}% a ${dadosTipo.max}% no valor total`,
              "Parcelamento em ate 36x sem juros adicionais",
              "Remocao do nome do SPC/Serasa apos acordo",
              "Suspensao de cobrancas e acoes judiciais",
              "Consulta e analise 100% gratuitas",
              "Pagamento apenas por resultado (10% do economizado)",
            ].map((beneficio, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{beneficio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                p: `Quanto posso economizar na dívida de ${tipoNome}${empresaNome ? ` com ${empresaNome}` : ""}?`,
                r: `Com base em ${dadosTipo.casos.toLocaleString()} casos analisados, a economia média é de ${descontoFinal}% do valor total. Uma dívida de R$ 30.000 pode ser quitada por aproximadamente R$ ${(30000 * (1 - descontoFinal / 100)).toLocaleString()}.`,
              },
              {
                p: `Quanto tempo leva para resolver minha dívida?`,
                r: `O tempo médio de resolução é de ${tempoFinal}. Casos urgentes (apreensão iminente ou bloqueio de conta) podem ser resolvidos em 24-48 horas com medidas liminares.`,
              },
              {
                p: `Preciso pagar algo adiantado?`,
                r: `Não. A consulta, análise de contrato e negociação são gratuitas. Você só paga 10% do valor economizado após o acordo ser formalizado. Sem resultado, sem cobrança.`,
              },
              {
                p: `Meu nome vai sair do SPC/Serasa?`,
                r: `Sim. Após a formalização do acordo e pagamento da primeira parcela, o credor tem obrigação legal de remover a negativação em até 5 dias úteis.`,
              },
              {
                p: `Posso negociar mesmo com processo judicial?`,
                r: `Sim. Na verdade, muitas vezes conseguimos melhores condições quando já existe processo, pois o credor prefere acordo a continuar com custos judiciais.`,
              },
            ].map((item, i) => (
              <details key={i} className="group p-6 rounded-xl bg-card border border-border">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  {item.p}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{item.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Links Internos - Minimo 10 links por pagina */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Outros tipos de dívida */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Se sua dívida for de {tipoNome}, veja também outros tipos
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
              {(tiposData as Array<{ slug: string; nome: string }>).filter(t => t.slug !== tipoSlug).slice(0, 5).map((t) => (
                <Link key={t.slug} href={`/negociar-divida/${t.slug}`} className="p-3 rounded-lg bg-card border border-border hover:border-primary transition-colors group text-center">
                  <p className="text-sm font-medium text-primary group-hover:underline">{t.nome}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Mesma divida em outros bancos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Negociar {tipoNome} em outros bancos
            </h2>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-3">
              {(empresasData as Array<{ slug: string; nome: string }>).filter(e => e.slug !== empresaSlug).slice(0, 6).map((e) => (
                <Link key={e.slug} href={`/negociar-divida/${tipoSlug}/${e.slug}`} className="p-3 rounded-lg bg-card border border-border hover:border-primary transition-colors group text-center">
                  <p className="text-sm font-medium text-primary group-hover:underline">{e.nome}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Por estado */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {tipoNome} por estado
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {(estadosData as Array<{ slug: string; nome: string }>).slice(0, 9).map((e) => (
                <Link key={e.slug} href={`/negociar-divida/${tipoSlug}/${e.slug}`} className="p-2 rounded bg-card border border-border hover:border-primary transition-colors group text-center">
                  <p className="text-xs font-medium text-primary group-hover:underline">{e.nome}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Links contextuais */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/simulador" className="p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group">
              <p className="font-semibold">Simulador de Divida</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Descubra quanto pode economizar</p>
            </Link>
            <Link href="/como-funciona" className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group">
              <p className="font-medium text-primary group-hover:underline">Como Funciona</p>
              <p className="text-sm text-muted-foreground mt-1">Entenda nosso processo</p>
            </Link>
            <Link href="/casos-de-sucesso" className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group">
              <p className="font-medium text-primary group-hover:underline">Casos de Sucesso</p>
              <p className="text-sm text-muted-foreground mt-1">Resultados reais de clientes</p>
            </Link>
            <Link href="/blog/juros-abusivos-cdc" className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group">
              <p className="font-medium text-primary group-hover:underline">Juros Abusivos</p>
              <p className="text-sm text-muted-foreground mt-1">Saiba identificar e contestar</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Descubra quanto pode economizar na sua divida de {tipoNome}
          </h2>
          <p className="text-primary-foreground/80 mb-8">Simulacao gratuita em 30 segundos. Sem compromisso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Ola! Preciso negociar minha divida de ${tipoNome}${empresaNome ? ` com ${empresaNome}` : ""}.`)}`}
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white text-lg hover:bg-[#20bb5a] transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              Negociar pelo WhatsApp
            </a>
            <a href={`tel:${WHATSAPP}`} className="flex items-center justify-center gap-2 rounded-full bg-primary-foreground/10 px-8 py-4 font-semibold text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
              <Phone className="h-6 w-6" />
              Ligar: {PHONE_DISPLAY}
            </a>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/70">
            <Users className="h-4 w-4 inline mr-1" />
            {DADOS_MERCADO.estatisticas.clientesAtendidos.toLocaleString()} clientes atendidos | 
            <TrendingDown className="h-4 w-4 inline mx-1" />
            R$ {(DADOS_MERCADO.estatisticas.valorNegociado / 1000000).toFixed(0)}M+ negociados
          </p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Descubra quanto pode economizar na sua dívida"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu caso agora"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de negociar com desconto"
            subheading="Avaliação em 30 segundos. Ver minhas opções sem compromisso."
            buttonText="Ver minhas opções sem compromisso"
          />
        </div>
      </section>
    </div>
  )
}

function IndexPage() {
  const tipos = tiposData as { slug: string; nome: string }[]
  const empresas = empresasData as { slug: string; nome: string }[]

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Negocie sua Divida com Desconto de ate 80%</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Escolha o tipo de divida ou o banco para ver como podemos ajudar
          </p>
          <Link href="/simulador" className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground hover:bg-accent/90 transition-colors">
            Simular Minha Economia
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Por tipo de divida</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tipos.slice(0, 10).map((tipo) => (
              <Link key={tipo.slug} href={`/negociar-divida/${tipo.slug}`} className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors text-center">
                <p className="font-medium text-foreground">{tipo.nome}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Por banco ou financeira</h2>
          <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
            {empresas.slice(0, 12).map((empresa) => (
              <Link key={empresa.slug} href={`/negociar-divida/cartao-credito/${empresa.slug}`} className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors text-center">
                <p className="font-medium text-foreground">{empresa.nome}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
