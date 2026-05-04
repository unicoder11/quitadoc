import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso | Quitadoc",
  description: "Leia nossos termos de uso e condições de serviço."
}

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-background py-12 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Termos de Uso</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este site, você concorda em estar vinculado por estes termos de uso. Se você não concorda com alguma parte destes termos, não use este site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Serviços Fornecidos</h2>
            <p>
              A Quitadoc fornece serviços jurídicos especializados em defesa veicular, cancelamento de busca e apreensão, revisão de contratos e renegociação de dívidas. Estes serviços são fornecidos no modelo de "success fee" - você paga apenas se obtivermos resultado favorável.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Uso Aceitável</h2>
            <p>
              Você concorda em usar este site apenas para fins legítimos e de forma que não infrinja os direitos de terceiros ou restrinja seu uso e gozo. Comportamento proibido inclui assédio ou causação de angústia ou inconveniência, transmissão de mensagens obscenas ou ofensivas, e perturbação do fluxo normal de diálogo dentro de sites da Quitadoc.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Isenção de Responsabilidade</h2>
            <p>
              As informações fornecidas neste site são apenas para fins informativos. Não constituem aconselhamento jurídico. Para aconselhamento jurídico específico, consulte um advogado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Limitação de Responsabilidade</h2>
            <p>
              A Quitadoc não será responsável por qualquer dano indireto, incidental, especial, consequente ou punitivo resultante do uso ou incapacidade de usar o site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Lei Aplicável</h2>
            <p>
              Estes termos de uso e as políticas de privacidade são regidas e interpretados de acordo com as leis do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Contato</h2>
            <p>
              Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco em <a href="mailto:contato@quitadoc.com.br" className="text-primary hover:underline">contato@quitadoc.com.br</a> ou (11) 92533-2215.
            </p>
          </section>

          <p className="text-xs text-muted-foreground mt-12">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </main>
  )
}
