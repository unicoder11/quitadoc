"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Início", href: "/" },
  {
    name: "Serviços",
    href: "#",
    children: [
      { name: "Cancelar Busca e Apreensão", href: "/cancelar-busca-apreensao" },
      { name: "Defesa Alienação Fiduciária", href: "/defesa-alienacao-fiduciaria" },
      { name: "Revisão de Contrato", href: "/revisao-contrato-financiamento" },
      { name: "Redução de Juros Abusivos", href: "/reducao-juros-abusivos" },
      { name: "Contestação de Leilão", href: "/contestacao-leilao-veiculo" },
    ],
  },
  { name: "Tabela FIPE", href: "/fipe" },
  { name: "Como Funciona", href: "/como-funciona" },
  { name: "Blog", href: "/blog" },
  { name: "Calculadora", href: "/calculadora-juros" },
  { name: "Casos de Sucesso", href: "/casos-de-sucesso" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()

  // Reset menus when navigation occurs
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-card">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 -ml-2">
          <Image 
            src="/logo.png" 
            alt="Quitadoc Logo" 
            width={70}
            height={19}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative group"
              >
                <button className="flex items-center gap-1 text-xl font-medium text-muted-foreground transition-colors hover:text-primary py-2">
                  {item.name}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-1 z-50 w-64 rounded-lg border border-border bg-card p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Link href="/consulta-gratuita">
            <Button className="bg-accent text-accent-foreground hover:bg-accent-light font-semibold">
              Consulta Gratuita
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden rounded-md p-2 text-muted-foreground hover:bg-secondary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Abrir menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link href="/consulta-gratuita" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent-light font-semibold">
                  Consulta Gratuita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
