import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

const services = [
  { name: "Cancelar Busca e Apreensão", href: "/cancelar-busca-apreensao" },
  { name: "Defesa Alienação Fiduciária", href: "/defesa-alienacao-fiduciaria" },
  { name: "Revisão de Contrato", href: "/revisao-contrato-financiamento" },
  { name: "Redução de Juros", href: "/reducao-juros-abusivos" },
  { name: "Contestação de Leilão", href: "/contestacao-leilao-veiculo" },
]

const pages = [
  { name: "Como Funciona", href: "/como-funciona" },
  { name: "Blog", href: "/blog" },
  { name: "Calculadora de Juros", href: "/calculadora-juros" },
  { name: "Casos de Sucesso", href: "/casos-de-sucesso" },
  { name: "Consulta Gratuita", href: "/consulta-gratuita" },
]

const locations = [
  { name: "São Paulo", href: "/busca-apreensao-sao-paulo" },
  { name: "Rio de Janeiro", href: "/defesa-veicular-rio-janeiro" },
  { name: "Brasília", href: "/advogado-alienacao-fiduciaria-brasilia" },
]

const blogPosts = [
  { name: "O que é Busca e Apreensão?", href: "/blog/o-que-e-busca-e-apreensao" },
  { name: "Direitos do Devedor", href: "/blog/direitos-devedor-financiamento" },
  { name: "Como Evitar Leilão", href: "/blog/como-evitar-leilao-veiculo" },
  { name: "Juros Abusivos CDC", href: "/blog/juros-abusivos-cdc" },
]

export function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Quitadoc Logo" width={120} height={33} className="h-auto w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 max-w-md text-sm text-primary-foreground/80 leading-relaxed">
              Especialistas em defesa veicular com mais de 5 anos de experiência. 
              Cancelamento de busca e apreensão, revisão de contratos e redução de juros abusivos.
            </p>
            <div className="mt-6 space-y-3">
              <a href="tel:+5511925332215" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                (11) 92533-2215
              </a>
              <a
                href="mailto:contato@quitadoc.com.br"
                className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
                contato@quitadoc.com.br
              </a>
              <p className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                Atuação em todo Brasil
              </p>
            </div>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Serviços</h3>
            <ul className="mt-4 space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Páginas</h3>
            <ul className="mt-4 space-y-2">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">Regiões</h3>
            <ul className="mt-4 space-y-2">
              {locations.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Blog</h3>
            <ul className="mt-4 space-y-2">
              {blogPosts.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-primary-foreground/10 pt-8">
          <div className="flex items-center gap-2 rounded-lg bg-primary-foreground/5 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs font-medium text-primary-foreground/80">650+ Veículos Salvos</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary-foreground/5 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs font-medium text-primary-foreground/80">87% Taxa de Sucesso</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary-foreground/5 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-primary-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-primary-foreground/80">5+ Anos de Experiência</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Quitadoc. Todos os direitos reservados. CNPJ: 12.345.678/0001-90 | OAB: SP 123456
          </p>
          <p className="mt-2 text-xs text-primary-foreground/40">
            <Link href="/politica-privacidade" className="hover:text-accent transition-colors">Política de Privacidade</Link>
            {" | "}
            <Link href="/termos-uso" className="hover:text-accent transition-colors">Termos de Uso</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
