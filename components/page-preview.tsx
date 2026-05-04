import { ContentGenerator, PageContent } from '@/lib/contentGenerator';

interface PagePreviewProps {
  content: PageContent;
}

export function PagePreview({ content }: PagePreviewProps) {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
          {content.h1}
        </h1>
      </header>

      {/* Introdução */}
      <section className="mb-12 prose prose-lg max-w-none">
        <p className="text-lg text-foreground/80 leading-relaxed">
          {content.intro}
        </p>
      </section>

      {/* Benefícios */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Por Que Escolher a Quitadoc</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-foreground/70">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="mb-16 bg-secondary/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Como Funciona</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {num}
              </div>
              <p className="text-sm text-foreground/70">
                Etapa {num}
              </p>
            </div>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content.howItWorks }} className="mt-6" />
      </section>

      {/* Testimoniais */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Casos de Sucesso</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {content.testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-foreground/80 mb-3 italic">
                "{testimonial.text}"
              </p>
              <p className="text-sm font-semibold text-accent">
                Economizou R$ {testimonial.saved.toLocaleString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          {content.faq.map((item, idx) => (
            <details
              key={idx}
              className="p-4 rounded-lg border border-border bg-card group"
            >
              <summary className="cursor-pointer font-semibold text-foreground flex justify-between items-center">
                <span>{item.question}</span>
                <span className="text-primary group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="mb-8 bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <p className="text-lg mb-6">
          {content.cta}
        </p>
        <button className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
          Solicitar Consulta Gratuita
        </button>
      </section>
    </article>
  );
}
