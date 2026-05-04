import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade | Quitadoc",
  description: "Conheça nossa política de privacidade e como protegemos seus dados."
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background py-12 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Informações que Coletamos</h2>
            <p>
              A Quitadoc coleta informações pessoais que você nos fornece voluntariamente através de formulários, como nome, email, telefone, CPF e informações sobre sua situação financeira.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Como Usamos Suas Informações</h2>
            <p>
              Utilizamos suas informações para prestar nossos serviços jurídicos, enviar comunicações importantes, responder suas dúvidas e melhorar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança física, eletrônica e procedural para proteger suas informações contra acesso não autorizado e uso indevido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Compartilhamento de Informações</h2>
            <p>
              Não compartilhamos suas informações pessoais com terceiros sem seu consentimento, exceto conforme necessário para prestar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir, atualizar ou deletar suas informações pessoais a qualquer momento. Entre em contato conosco para exercer esses direitos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco em <a href="mailto:contato@quitadoc.com.br" className="text-primary hover:underline">contato@quitadoc.com.br</a> ou (11) 92533-2215.
            </p>
          </section>

          <p className="text-xs text-muted-foreground mt-12">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </main>
  )
}
