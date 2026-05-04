import Link from "next/link"

interface ContentSection {
  title: string
  content: string
  links?: { text: string; href: string }[]
}

interface SEOContentProps {
  title: string
  sections: ContentSection[]
}

export function SEOContent({ title, sections }: SEOContentProps) {
  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2 className="text-balance text-foreground">{title}</h2>
        
        <div className="mt-8 space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <div 
                className="mt-4 prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
              {section.links && section.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {section.links.map((link, linkIndex) => (
                    <Link 
                      key={linkIndex}
                      href={link.href}
                      className="text-primary hover:text-primary-light underline underline-offset-4"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
