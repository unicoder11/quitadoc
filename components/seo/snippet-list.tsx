import { cn } from "@/lib/utils"
import { Check, AlertTriangle, ArrowRight } from "lucide-react"

interface SnippetListProps {
  title: string
  items: string[]
  type?: "check" | "warning" | "arrow" | "number"
  className?: string
}

export function SnippetList({ title, items, type = "check", className }: SnippetListProps) {
  const icons = {
    check: Check,
    warning: AlertTriangle,
    arrow: ArrowRight,
    number: null,
  }

  const Icon = icons[type]

  return (
    <section className={cn("my-8 rounded-xl bg-card p-6 shadow-sm", className)}>
      <h3 className="mb-4 text-lg font-bold text-foreground md:text-xl">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            {type === "number" ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
            ) : Icon ? (
              <Icon className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                type === "check" && "text-green-600",
                type === "warning" && "text-amber-500",
                type === "arrow" && "text-primary"
              )} />
            ) : null}
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

interface ConditionListProps {
  title: string
  conditions: Array<{
    condition: string
    description?: string
  }>
  className?: string
}

export function ConditionList({ title, conditions, className }: ConditionListProps) {
  return (
    <section 
      className={cn("my-8 rounded-xl border border-amber-200 bg-amber-50 p-6", className)}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <h3 
        className="mb-4 text-lg font-bold text-amber-900 md:text-xl"
        itemProp="name"
      >
        {title}
      </h3>
      <ul className="space-y-3" itemProp="itemListElement">
        {conditions.map((item, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3"
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            <span 
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white"
              itemProp="position"
            >
              {index + 1}
            </span>
            <div>
              <span className="font-medium text-amber-900" itemProp="name">
                {item.condition}
              </span>
              {item.description && (
                <p className="mt-1 text-sm text-amber-700">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
