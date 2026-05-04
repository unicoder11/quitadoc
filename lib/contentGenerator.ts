import { SpintaxEngine } from './spintax';

export interface PageContext {
  service: string;        // "negociar-divida" | "cancelar-busca-apreensao" | "revisao-contrato" | "reducao-juros" | "contestacao-leilao"
  institution: string;    // "nubank" | "itau" | "bradesco" | "santander" | "inter" | "c6" | "bb" | "caixa"
  productType?: string;   // "cartao" | "emprestimo" | "financiamento"
  state?: string;         // "rj" | "sp" | "mg" | "rs" | "pr" | "ba" | "pe" | "sc"
  city?: string;          // "rio-de-janeiro" | "sao-paulo" | "belo-horizonte" | etc
}

export interface PageContent {
  h1: string;
  intro: string;
  benefits: BenefitCard[];
  howItWorks: string;
  testimonials: Testimonial[];
  faq: FAQItem[];
  cta: string;
}

interface BenefitCard {
  icon: string;
  title: string;
  text: string;
}

interface Testimonial {
  name: string;
  initials: string;
  location: string;
  text: string;
  saved: number;
}

interface FAQItem {
  question: string;
  answer: string;
}

export class ContentGenerator {
  private spintax = new SpintaxEngine();
  
  /**
   * Gera conteúdo completo para uma página
   */
  async generatePageContent(context: PageContext): Promise<PageContent> {
    const seed = this.hashContext(context);
    
    return {
      h1: this.generateH1(context),
      intro: this.generateIntro(context, seed),
      benefits: this.generateBenefits(context, seed),
      howItWorks: this.generateHowItWorks(context, seed),
      testimonials: this.generateTestimonials(context, seed),
      faq: this.generateFAQ(context, seed),
      cta: this.generateCTA(context, seed),
    };
  }
  
  /**
   * Gera H1 único para a página
   */
  private generateH1(ctx: PageContext): string {
    const service = this.getServiceName(ctx.service);
    const institution = this.getInstitutionName(ctx.institution);
    const location = this.getLocationPhrase(ctx);
    
    return `${service} com ${institution}${location}`;
  }
  
  /**
   * Gera introdução com 5 variações diferentes
   */
  private generateIntro(ctx: PageContext, seed: number): string {
    const institutionName = this.getInstitutionName(ctx.institution);
    const location = this.getLocationPhrase(ctx);
    const serviceVerb = this.getServiceVerb(ctx.service);
    
    const variations = [
      `{Se você está|Caso esteja|Quando você se encontra} {enfrentando dificuldades|com problemas|tendo desafios} para {pagar|quitar|honrar} sua {dívida|obrigação financeira|débito} com ${institutionName} ${location}, {saiba que|é importante saber que|tenha certeza de que} {existem|há|estão disponíveis} {soluções legais|alternativas jurídicas|caminhos legítimos} que podem {reduzir significativamente|diminuir consideravelmente|cortar drasticamente} o valor devido.`,
      
      `{Dívidas|Débitos|Pendências financeiras} com ${institutionName} {podem conter|frequentemente têm|muitas vezes incluem} {irregularidades|ilegalidades|abusos} como {juros abusivos|taxas excessivas|cobranças indevidas}. {Através de|Por meio de|Com base em} {análise técnica|avaliação especializada|revisão detalhada} do contrato, {conseguimos|podemos|temos capacidade de} identificar essas {falhas|irregularidades|problemas}.`,
      
      `O ${institutionName} é {uma das instituições|um dos bancos|uma das fintechs} mais {procuradas|utilizadas|populares} ${location}. Nossa {especialização|expertise|experiência} em ${serviceVerb} já {resultou|gerou|produziu} em economia de {milhões|valores expressivos|quantias significativas} para nossos clientes.`,
      
      `{Precisa|Necessita|Está buscando} ${serviceVerb} com ${institutionName}? Nossa equipe jurídica {atua há mais de 5 anos|possui experiência comprovada|trabalha há meia década} {defendendo|protegendo|representando} consumidores em casos {idênticos|semelhantes|parecidos} ao seu.`,
      
      `{Você sabia que|Está ciente de que|Conhece o fato de que} {a maioria|grande parte|mais de 80%} dos contratos do ${institutionName} ${location} {contém|possui|apresenta} {cláusulas abusivas|termos ilegais|cobranças indevidas}?`,
    ];
    
    const selectedVariation = variations[seed % variations.length];
    return this.spintax.processWithSeed(selectedVariation, seed);
  }
  
  /**
   * Gera seção de benefícios com 4 cards selecionados aleatoriamente
   */
  private generateBenefits(ctx: PageContext, seed: number): BenefitCard[] {
    const allBenefits: BenefitCard[] = [
      {
        icon: '💰',
        title: '{Redução|Diminuição|Corte} de até 80%',
        text: '{Conseguimos|Obtemos|Alcançamos} reduções de {até|acima de|superiores a} 80% através de {identificação|detecção|reconhecimento} de {juros abusivos|cobranças ilegais|taxas indevidas}.',
      },
      {
        icon: '⚖️',
        title: 'Defesa Jurídica {Especializada|Expert|Qualificada}',
        text: '{Equipe|Time|Grupo} de advogados {especializados|experts|com expertise} em {direito bancário|defesa do consumidor|CDC}.',
      },
      {
        icon: '🎯',
        title: '87% de Taxa de Sucesso',
        text: '{Mais de|Acima de|Superiores a} 87% dos nossos {clientes|casos|processos} {conseguem|obtêm|alcançam} {redução significativa|diminuição expressiva}.',
      },
      {
        icon: '⏱️',
        title: 'Resposta em até 2 horas',
        text: '{Analisamos|Avaliamos|Revisamos} seu caso em até 2 horas e {fornecemos|disponibilizamos|entregamos} um {parecer|relatório|diagnóstico} completo.',
      },
      {
        icon: '💼',
        title: 'Success Fee {Apenas|Somente|Só} 10%',
        text: 'Você {só paga|paga apenas|paga somente} se {ganharmos|obtivermos sucesso|vencermos}. Nossa taxa é de {apenas|somente|só} 10%.',
      },
      {
        icon: '🌎',
        title: 'Atuação Nacional',
        text: '{Atuamos|Trabalhamos|Operamos} em {todo o Brasil|todos os estados|todas as regiões}. {Onde você estiver|Independente da sua localização}, podemos ajudar.',
      },
    ];
    
    const selected = this.selectRandom(allBenefits, 4, seed);
    
    return selected.map(benefit => ({
      icon: benefit.icon,
      title: this.spintax.processWithSeed(benefit.title, seed),
      text: this.spintax.processWithSeed(benefit.text, seed),
    }));
  }
  
  /**
   * Gera seção "Como Funciona"
   */
  private generateHowItWorks(ctx: PageContext, seed: number): string {
    const serviceVerb = this.getServiceVerb(ctx.service);
    
    const steps = [
      {
        num: '1',
        title: '{Consulta|Avaliação|Análise} Gratuita',
        desc: `{Envie|Compartilhe|Passe} seus documentos via WhatsApp. {Analisamos|Avaliamos|Examinamos} seu caso {rapidamente|com urgência|em poucos minutos}.`,
      },
      {
        num: '2',
        title: 'Revisão de Contrato',
        desc: `{Nossos especialistas|Nossa equipe|Nossos advogados} {fazem|realizam|conduzem} revisão completa do contrato {buscando|procurando|identificando} {irregularidades|abusos|ilegalidades}.`,
      },
      {
        num: '3',
        title: 'Estratégia Jurídica',
        desc: `{Apresentamos|Mostramos|Explicamos} as {melhores opções|caminhos mais viáveis|estratégias recomendadas} para ${serviceVerb}.`,
      },
      {
        num: '4',
        title: 'Execução e Acompanhamento',
        desc: `{Entramos com|Protocolamos|Iniciamos} ação judicial ou {negociamos|tratamos|acordamos} {diretamente com o credor|com a instituição|conforme necessário}.`,
      },
    ];
    
    return steps.map(step => `
      <div class="step">
        <div class="step-number">${step.num}</div>
        <h3>${this.spintax.processWithSeed(step.title, seed + parseInt(step.num))}</h3>
        <p>${this.spintax.processWithSeed(step.desc, seed + parseInt(step.num))}</p>
      </div>
    `).join('');
  }
  
  /**
   * Gera testimoniais únicos baseado em seed
   */
  private generateTestimonials(ctx: PageContext, seed: number): Testimonial[] {
    const firstNames = ['Ricardo', 'Ana', 'Carlos', 'Mariana', 'Paulo', 'Juliana', 'Fernando', 'Beatriz'];
    const lastInitials = ['M', 'S', 'O', 'L', 'P', 'R', 'G', 'T'];
    const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Porto Alegre, RS', 'Brasília, DF'];
    
    const testimonials: Testimonial[] = [];
    
    for (let i = 0; i < 3; i++) {
      const firstName = firstNames[(seed + i) % firstNames.length];
      const lastInitial = lastInitials[(seed + i + 1) % lastInitials.length];
      const city = cities[(seed + i) % cities.length];
      const saved = [15200, 22400, 38400, 48200, 62800][i];
      
      testimonials.push({
        name: firstName,
        initials: `${firstName.charAt(0)}${lastInitial}`,
        location: city,
        text: this.generateTestimonialText(ctx, seed + i),
        saved,
      });
    }
    
    return testimonials;
  }
  
  private generateTestimonialText(ctx: PageContext, seed: number): string {
    const texts = [
      '{Estava|Me encontrava|Fiquei} {desesperado|sem saída|perdido} com minha dívida. A Quitadoc {analisou|revisou|examinou} meu contrato e {encontrou|identificou|detectou} {juros abusivos|cobranças ilegais}. {Conseguiram|Obtiveram} reduzir minha parcela em {40%|mais de 35%}!',
      
      'Meu veículo estava para ir a leilão. A equipe {entrou com|protocolou|ajuizou} ação e {conseguiu|obteve} {ANULAR|CANCELAR} o leilão. {Renegociamos|Acordamos} com {60%|mais de 50%} de desconto!',
      
      '{Pagava|Estava pagando} R$ 1.850/mês há 2 anos. A análise {mostrou|revelou|detectou} {TAC ilegal|seguro duplicado|taxas indevidas}. {Consegui|Obtive} redução para R$ 980/mês e ainda recebi reembolso!',
    ];
    
    return this.spintax.processWithSeed(texts[seed % texts.length], seed);
  }
  
  /**
   * Gera FAQ contextual com 4 questões relevantes
   */
  private generateFAQ(ctx: PageContext, seed: number): FAQItem[] {
    const institutionName = this.getInstitutionName(ctx.institution);
    const serviceVerb = this.getServiceVerb(ctx.service);
    const location = this.getLocationPhrase(ctx);
    
    const faqs: FAQItem[] = [
      {
        question: `Como funciona o ${this.getServiceName(ctx.service)} com ${institutionName}?`,
        answer: `O processo {começa|inicia|tem início} com uma {análise gratuita|avaliação sem custo|revisão inicial} do seu contrato. {Identificamos|Detectamos|Encontramos} {irregularidades|abusos|ilegalidades} e {entramos com|protocolamos|ajuizamos} ação judicial ou {negociamos|tratamos|acordamos} diretamente.`,
      },
      {
        question: 'Quanto custa o serviço de defesa?',
        answer: '{Trabalhamos|Operamos|Funcionamos} com success fee de {apenas|somente|só} 10%. Você {só paga|paga apenas} se {ganharmos|vencermos|obtivermos êxito}. {Não há|Não existe|Não cobramos} custo inicial.',
      },
      {
        question: 'Qual é a taxa de sucesso real?',
        answer: 'Nossa taxa de sucesso é de {87%|87% ou mais|superior a 85%}. Em {87 de cada 100|quase 9 em cada 10} casos, {conseguimos|obtemos|alcançamos} {redução significativa|diminuição expressiva}.',
      },
      {
        question: `Vocês atendem ${location}?`,
        answer: `Sim! {Atuamos|Trabalhamos|Prestamos serviço} em todo Brasil e {especialmente em|com foco em} ${location}. Todo o processo é {feito|realizado|conduzido} online.`,
      },
    ];
    
    return faqs.map(faq => ({
      question: faq.question,
      answer: this.spintax.processWithSeed(faq.answer, seed),
    }));
  }
  
  /**
   * Gera CTA final
   */
  private generateCTA(ctx: PageContext, seed: number): string {
    const ctas = [
      'Não deixe sua situação {piorar|se agravar|se complicar}. {Solicite|Peça|Requeira} sua {consulta gratuita|análise grátis|avaliação sem compromisso} agora mesmo!',
      '{Comece|Inicie|Dê o primeiro passo} a recuperar sua {tranquilidade|paz financeira|segurança}. Fale com nosso especialista hoje!',
      '{Sua defesa|Seu caso|Sua situação} é nossa {prioridade|preocupação|missão}. {Entre em contato|Fale conosco|Nos procure} para uma {análise gratuita|consulta sem custo|avaliação inicial}.',
    ];
    
    return this.spintax.processWithSeed(ctas[seed % ctas.length], seed);
  }
  
  /**
   * Hash determinístico do contexto para consistência
   */
  private hashContext(ctx: PageContext): number {
    const str = JSON.stringify(ctx);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  
  /**
   * Seleciona N itens aleatórios com base em seed
   */
  private selectRandom<T>(array: T[], count: number, seed: number): T[] {
    const shuffled = [...array];
    let currentSeed = seed;
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const j = Math.floor((currentSeed / 233280) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }
  
  // ============ HELPERS DE NOMENCLATURA ============
  
  private getInstitutionName(code: string): string {
    const map: Record<string, string> = {
      'nubank': 'Nubank',
      'itau': 'Itaú',
      'bradesco': 'Bradesco',
      'santander': 'Santander',
      'bb': 'Banco do Brasil',
      'caixa': 'Caixa Econômica',
      'inter': 'Banco Inter',
      'c6': 'C6 Bank',
      'safra': 'Banco Safra',
      'bmg': 'BMG',
      'pan': 'Banco PAN',
    };
    return map[code] || code;
  }
  
  private getServiceName(code: string): string {
    const map: Record<string, string> = {
      'negociar-divida': 'Negociação de Dívida',
      'cancelar-busca-apreensao': 'Cancelamento de Busca e Apreensão',
      'revisao-contrato': 'Revisão de Contrato',
      'reducao-juros': 'Redução de Juros Abusivos',
      'contestacao-leilao': 'Contestação de Leilão',
    };
    return map[code] || code;
  }
  
  private getServiceVerb(code: string): string {
    const map: Record<string, string> = {
      'negociar-divida': 'negociar sua dívida',
      'cancelar-busca-apreensao': 'cancelar a busca e apreensão do seu veículo',
      'revisao-contrato': 'revisar o seu contrato',
      'reducao-juros': 'reduzir os juros abusivos',
      'contestacao-leilao': 'contestar o leilão do seu bem',
    };
    return map[code] || code;
  }
  
  private getStateName(code: string): string {
    const map: Record<string, string> = {
      'rj': 'Rio de Janeiro',
      'sp': 'São Paulo',
      'mg': 'Minas Gerais',
      'rs': 'Rio Grande do Sul',
      'pr': 'Paraná',
      'ba': 'Bahia',
      'pe': 'Pernambuco',
      'sc': 'Santa Catarina',
      'df': 'Distrito Federal',
    };
    return map[code] || code;
  }
  
  private getCityName(code: string): string {
    const map: Record<string, string> = {
      'rio-de-janeiro': 'Rio de Janeiro',
      'sao-paulo': 'São Paulo',
      'belo-horizonte': 'Belo Horizonte',
      'porto-alegre': 'Porto Alegre',
      'brasilia': 'Brasília',
      'salvador': 'Salvador',
      'recife': 'Recife',
      'fortaleza': 'Fortaleza',
      'curitiba': 'Curitiba',
      'manaus': 'Manaus',
    };
    return map[code] || code;
  }
  
  private getLocationPhrase(ctx: PageContext): string {
    if (ctx.city && ctx.state) {
      return ` em ${this.getCityName(ctx.city)}, ${this.getStateName(ctx.state)}`;
    }
    if (ctx.state) {
      return ` no estado de ${this.getStateName(ctx.state)}`;
    }
    return ' em todo Brasil';
  }
}
