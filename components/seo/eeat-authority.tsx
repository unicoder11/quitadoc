"use client"

import { Scale, Award, Shield, CheckCircle, User, BookOpen, FileCheck } from "lucide-react"

interface ExpertAuthorProps {
  name: string
  title: string
  oab: string
  specialty: string
  experience: string
  imageUrl?: string
}

export function ExpertAuthor({ name, title, oab, specialty, experience, imageUrl }: ExpertAuthorProps) {
  return (
    <div 
      className="rounded-lg border border-border bg-card p-5"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="h-16 w-16 rounded-full object-cover"
              itemProp="image"
            />
          ) : (
            <User className="h-8 w-8 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground" itemProp="name">{name}</h4>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground" itemProp="jobTitle">{title}</p>
          <p className="text-xs text-primary" itemProp="memberOf">{oab}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {specialty}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              {experience}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface LegalCitationProps {
  law: string
  article: string
  description: string
  source?: string
}

export function LegalCitation({ law, article, description, source }: LegalCitationProps) {
  return (
    <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
      <div className="flex items-start gap-3">
        <Scale className="h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">{law}</p>
          <p className="text-sm font-medium text-primary">{article}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          {source && (
            <p className="mt-2 text-xs text-muted-foreground">
              Fonte: <a href={source} target="_blank" rel="noopener noreferrer" className="text-primary underline">{source}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface TrustBadgesProps {
  showAll?: boolean
}

export function TrustBadges({ showAll = true }: TrustBadgesProps) {
  const badges = [
    { icon: Shield, label: "100% Seguro", description: "Dados protegidos" },
    { icon: Award, label: "OAB Registrado", description: "Advogados qualificados" },
    { icon: CheckCircle, label: "5000+ Casos", description: "Experiencia comprovada" },
    { icon: BookOpen, label: "Atualizado 2024", description: "Legislacao vigente" },
  ]

  const displayBadges = showAll ? badges : badges.slice(0, 2)

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border border-border bg-card p-4">
      {displayBadges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <badge.icon className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-semibold text-foreground">{badge.label}</p>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

interface RealCaseExampleProps {
  title: string
  situation: string
  solution: string
  result: string
  timeline?: string
}

export function RealCaseExample({ title, situation, solution, result, timeline }: RealCaseExampleProps) {
  return (
    <div className="rounded-lg border border-border bg-gradient-to-br from-green-50 to-white p-5 dark:from-green-950/20 dark:to-card">
      <div className="mb-3 flex items-center gap-2">
        <FileCheck className="h-5 w-5 text-green-600" />
        <h4 className="font-semibold text-foreground">{title}</h4>
        {timeline && (
          <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            {timeline}
          </span>
        )}
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-foreground">Situacao:</p>
          <p className="text-muted-foreground">{situation}</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Solucao aplicada:</p>
          <p className="text-muted-foreground">{solution}</p>
        </div>
        <div className="rounded-md bg-green-100 p-3 dark:bg-green-900/30">
          <p className="font-medium text-green-800 dark:text-green-300">Resultado: {result}</p>
        </div>
      </div>
    </div>
  )
}

interface DeepContentBlockProps {
  title: string
  content: string
  example?: string
  tip?: string
  warning?: string
}

export function DeepContentBlock({ title, content, example, tip, warning }: DeepContentBlockProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{content}</p>
      
      {example && (
        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Exemplo pratico:</p>
          <p className="text-sm text-blue-700 dark:text-blue-400">{example}</p>
        </div>
      )}
      
      {tip && (
        <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4 dark:bg-green-950/20">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">Dica importante:</p>
          <p className="text-sm text-green-700 dark:text-green-400">{tip}</p>
        </div>
      )}
      
      {warning && (
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/20">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Atencao:</p>
          <p className="text-sm text-amber-700 dark:text-amber-400">{warning}</p>
        </div>
      )}
    </div>
  )
}

interface ScenarioBlockProps {
  scenarios: Array<{
    title: string
    description: string
    action: string
    urgency: "low" | "medium" | "high"
  }>
}

export function ScenarioBlock({ scenarios }: ScenarioBlockProps) {
  const urgencyColors = {
    low: "border-green-500 bg-green-50 dark:bg-green-950/20",
    medium: "border-amber-500 bg-amber-50 dark:bg-amber-950/20",
    high: "border-red-500 bg-red-50 dark:bg-red-950/20",
  }

  const urgencyLabels = {
    low: "Baixa urgencia",
    medium: "Media urgencia", 
    high: "Alta urgencia",
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Cenarios Comuns</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {scenarios.map((scenario, index) => (
          <div 
            key={index} 
            className={`rounded-lg border-l-4 p-4 ${urgencyColors[scenario.urgency]}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium text-foreground">{scenario.title}</h4>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                scenario.urgency === "high" ? "bg-red-200 text-red-800" :
                scenario.urgency === "medium" ? "bg-amber-200 text-amber-800" :
                "bg-green-200 text-green-800"
              }`}>
                {urgencyLabels[scenario.urgency]}
              </span>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">{scenario.description}</p>
            <p className="text-sm font-medium text-primary">Acao: {scenario.action}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
