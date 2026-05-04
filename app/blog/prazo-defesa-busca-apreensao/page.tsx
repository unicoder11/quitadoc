import { Metadata } from "next"
import { FormCTA } from "@/components/sections/form-cta"
import { Breadcrumb } from "@/components/seo/breadcrumb"
import { generateBreadcrumbSchema } from "@/lib/breadcrumbSchema"

export const metadata: Metadata = {
  title: "Prazo para se Defender de Busca e Apreensão | Quitadoc",
  description: "Descubra os prazos legais para contestar busca e apreensão. Saiba quanto tempo você tem após notificação e após apreensão do veículo."
}

export default function PrazoBuscaApreensao() {
  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: "Prazo para Defesa de Busca e Apreensão", href: "/blog/prazo-defesa-busca-apreensao" }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumb items={breadcrumbs} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Qual é o Prazo para se Defender de uma Busca e Apreensão?</h1>
        <p className="text-muted-foreground mb-8">Publicado em {new Date().toLocaleDateString('pt-BR')} por Equipe Quitadoc</p>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Um dos erros mais comuns é achar que você não pode fazer nada após receber uma intimação de busca e apreensão. A verdade é que existem prazos legais específicos, e se você agir rápido, pode salvar seu veículo. Neste artigo, explicamos todos os prazos que você precisa conhecer.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Os Prazos Mais Importantes</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1. Após Receber a Notificação (3 dias)</h3>
            <p>
              Você tem 3 dias úteis após receber a notificação de busca e apreensão para pagar a dívida. Se não pagá-la, o oficial de justiça pode ir buscar seu veículo a qualquer momento, sem aviso prévio.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2. Após a Apreensão (5 dias)</h3>
            <p>
              Este é o prazo mais crítico. Você tem apenas 5 dias úteis após a apreensão do veículo para apresentar defesa judicial. Neste prazo, você pode contestar a legalidade da apreensão e pedir a devolução imediata do carro através de uma liminar.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3. Bloqueio de Conta (SISBAJUD - 5 dias)</h3>
            <p>
              Se sua conta foi bloqueada pelo sistema SISBAJUD, você também tem 5 dias para solicitar o desbloqueio administrativamente. Além disso, valores impenhóráveis (como salário e poupança até 40 salários mínimos) devem ser liberados imediatamente.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4. Antes do Leilão (Depende da fase)</h3>
            <p>
              Os prazos para contestar um leilão variam conforme o tipo: em leilões extrajudiciais, você pode contestar até 5 dias antes. Em judiciais, há prazos diferentes dependendo da fase processual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Por Que Esses Prazos São Críticos?</h2>
            <p>
              Não é coincidência que os prazos sejam tão curtos. A lei quer que você aja rápido e de forma decisiva. Se você deixar passar esses prazos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Perde o direito de contestar a apreensão</li>
              <li>Seu veículo segue para leilão</li>
              <li>A situação fica muito mais complexa</li>
              <li>As chances de recuperar seu carro diminuem drasticamente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">O Que Fazer Imediatamente</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Se recebeu notificação: Contate um advogado NO MESMO DIA</li>
              <li>Se o veículo foi apreendido: Não espere - ligue para nós agora mesmo</li>
              <li>Reúna toda documentação: contrato, extratos, comprovantes de pagamento</li>
              <li>Preserve evidências: prints, mensagens, comunicações com banco</li>
              <li>Não assine nada sem orientação jurídica</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Casos Reais: A Importância da Velocidade</h2>
            <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
              <p className="font-semibold text-foreground mb-2">Carlos - Motorista de App</p>
              <p>
                Carlos recebeu a notificação e esperou 6 dias pensando que tinha mais tempo. Quando chamou um advogado, o prazo havia expirado. Seu carro foi para leilão e ele perdeu tudo. Se tivesse agido em 3 dias, teríamos conseguido uma liminar.
              </p>
            </div>

            <div className="bg-success/10 p-6 rounded-lg border-l-4 border-success mt-6">
              <p className="font-semibold text-foreground mb-2">Marina - Servidora Pública</p>
              <p>
                Marina ligou no mesmo dia que recebeu a notificação. Em 48 horas, conseguimos uma liminar que impediu a apreensão. Hoje seu carro está seguro e ela negocia a dívida com desconto de 50%.
              </p>
            </div>
          </section>

          <div className="bg-accent/10 p-6 rounded-lg mt-8">
            <p className="text-foreground font-semibold mb-2">Tempo é ouro neste processo</p>
            <p>
              Se você recebeu uma notificação ou seu veículo foi apreendido, cada hora conta. Não desperdice seu prazo legal. Nossa equipe está preparada para agir rapidamente e proteger seus direitos.
            </p>
          </div>
        </div>
      </article>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="mid"
            heading="Seu prazo pode estar correndo. Verifique agora"
            subheading="Adicione seu e-mail que nossos profissionais entrarão em contato com você."
            buttonText="Analisar meu caso agora"
          />
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <FormCTA
            variant="final"
            heading="Ainda dá tempo de agir"
            subheading="Avaliação em 30 segundos."
            buttonText="Quero evitar a apreensão"
          />
        </div>
      </section>
    </main>
  )
}
