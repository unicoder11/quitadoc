/**
 * Content Generator com Spintax
 * Gera conteúdo variado e único para cada página
 * Evita thin content e duplicação
 */

/**
 * Spin spintax e retorna texto único
 * @param {string} text - Texto com spintax {opção1|opção2|opção3}
 * @returns {string} Texto spinado
 */
export function spinText(text) {
  return text.replace(/\{([^}]+)\}/g, (match, options) => {
    const choices = options.split('|').map(s => s.trim());
    return choices[Math.floor(Math.random() * choices.length)];
  });
}

/**
 * Gera introdução variada para página
 */
export function gerarIntroducao(tipo, empresa, estado, cidade) {
  const introTemplates = [
    `{Descubra|Saiba|Entenda|Conheça} como {negociar|renegociar|quitar|reduzir|regularizar} sua dívida de {tipo} com {empresa} em {estado}. {Você pode|É possível|Conseguimos} reduzir até 80% do valor devido {rapidamente|sem burocracia|legalmente|de forma segura}.`,
    `{Possui|Tem} dívida em {empresa}? {Vemos|Encontramos|Identificamos} a {melhor solução|estratégia certa|forma mais rápida} para {liberar|desbloquear|recuperar} seus bens e {reduzir|minimizar|eliminar} a cobrança. {Funciona|Dá resultado|Garante resultado} em {até 24 horas|1-2 dias úteis|poucos dias}.`,
    `{Carro penhorado|Bloqueado|Apreendido} de {tipo} no {estado}? {Advogados especialistas|Nossa equipe|Profissionais} conseguem {suspender|cancelar|reverter} a {penhora|apreensão|restrição} {legalmente|judicialmente|em tempo recorde}.`,
  ];

  const template = introTemplates[Math.floor(Math.random() * introTemplates.length)];
  let result = template
    .replace(/{tipo}/g, tipo)
    .replace(/{empresa}/g, empresa)
    .replace(/{estado}/g, estado)
    .replace(/{cidade}/g, cidade || estado);

  return spinText(result);
}

/**
 * Gera H1 otimizado para SEO
 */
export function gerarH1(tipo, empresa, estado) {
  const templates = [
    `{Negociar|Renegociar|Quitar} {Dívida|Débito} de {tipo} com {empresa} em {estado}: {Redução|Desconto} de até 80%`,
    `Como {Cancelar|Negociar|Resolver} {Penhora|Apreensão|Restrição} de {tipo} {em|no} {estado}`,
    `{Proteja|Recupere|Libere} seu {Veículo|Bem|Crédito} de {tipo} {com|em} {empresa} {em|no} {estado}`,
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  let result = template
    .replace(/{tipo}/g, tipo)
    .replace(/{empresa}/g, empresa)
    .replace(/{estado}/g, estado);

  return spinText(result);
}

/**
 * Gera meta description variada
 */
export function gerarMetaDescription(tipo, empresa, estado, cidade) {
  const templates = [
    `{Negocie|Renegocie|Quitar} sua dívida de ${tipo} com ${empresa} em ${cidade || estado}. {Redução|Desconto} até 80%. {Consulta grátis|Orientação jurídica}. ${process.env.NEXT_PUBLIC_PHONE}`,
    `${empresa}: {defesa contra|solução para|acordo} dívida de ${tipo}. {Suspensão de cobrança|Proteção de bens|Redução de juros}. Atendimento em ${cidade || estado}.`,
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  return spinText(template).substring(0, 160);
}

/**
 * Gera seção "Como Negociar" com passos
 */
export function gerarComoNegociar(tipo, empresa) {
  const steps = [
    `{Passo 1|Etapa 1}: {Envie|Encaminhe|Compartilhe} seus {documentos|contratos|comprovantes de dívida} via {WhatsApp|email|plataforma segura}.`,
    `{Passo 2|Etapa 2}: {Nossa equipe|Nossos especialistas|Advogados} {analisam|revisam|avaliam} seu caso e {identificam|encontram|localizam} {inconsistências|erros legais|abusividades}.`,
    `{Passo 3|Etapa 3}: {Negociamos|Entramos em contato|Negociação} {diretamente com|junto ao|com} ${empresa} para {reduzir|minimizar|eliminar} a dívida.`,
    `{Passo 4|Etapa 4}: {Você recebe|Obtém|Conquista} {acordo formalizado|contrato de renegociação|termo de negociação} com {redução de até 80%|desconto significativo|novo valor menor}.`,
  ];

  return steps.map((step, i) => {
    const header = `Passo ${i + 1}`;
    const content = spinText(step);
    return { header, content };
  });
}

/**
 * Gera benefícios variados
 */
export function gerarBeneficios(tipo, empresa) {
  const beneficios = [
    `{Redução|Desconto} de até 80% {da dívida|do valor devido|do débito}`,
    `{Suspensão|Paralisação|Cancelamento} {imediata|rápida} de {cobrança|ações judiciais|processos}`,
    `{Recuperação|Liberação|Devolução} de {bens penhorados|veículos apreendidos|bloqueios de conta}`,
    `{Parcelamento|Reparcelamento} em {até 36|até 48|até 60} {meses|vezes}`,
    `{Eliminação|Remoção} de {negativação|restrição de crédito|débito SPC/Serasa}`,
    `{Sem|Nenhuma} {taxa inicial|entrada|adiantamento} - {pague|pagamento} {só no resultado|após acordo|por sucesso}`,
  ];

  return beneficios.map(spinText);
}

/**
 * Gera FAQ para página
 */
export function gerarFAQ(tipo, empresa, estado) {
  const faqTemplates = [
    {
      q: `{Posso|É possível} {negociar|quitar} minha dívida de {tipo} com {empresa}?`,
      a: `{Sim, com certeza|Com absoluta certeza|Sim, definitivamente}. {Cada caso|Toda situação|Cada situação} é {diferente|particular|única}, mas {conseguimos reduzir|é possível reduzir|podemos reduzir} a {dívida|cobrança|pendência} em média {50%|60%|70%|80%}.`,
    },
    {
      q: `{Quanto tempo|Quanto tempo leva|Qual o prazo} para {negociar|resolver|quitar} a dívida?`,
      a: `{Em média|Normalmente|Geralmente}, {conseguimos acordo|obtemos resultado|resolvemos} em {7|10|15|21} dias úteis. {Casos urgentes|Situações críticas|Bloqueios iminentes} podem ser {resolvidos em horas|processados em 24-48 horas}.`,
    },
    {
      q: `{Preciso|Devo} {pagar|arcar com} {alguma taxa|custos|despesas} {inicialmente|no começo}?`,
      a: `{Não|Negativo|De jeito nenhum}. {Não cobramos|Sem cobrança|Zero taxa} {inicialmente|adiantado|na consulta}. {Você paga|Pagamento} {10% do valor economizado|taxa de sucesso} {após|depois} {acordo formalizado|resultado positivo|negociação concluída}.`,
    },
    {
      q: `{Qual será|Qual é|Qual seria} meu novo valor de dívida?`,
      a: `{Depende|Varia|Muda} {do caso|da situação|da análise}. {Analisamos|Revisamos|Avaliamos} o {contrato|acordo original|documento}, {juros abusivos|encargos indevidos|cobranças indevidas} e {propomos|sugerimos|apresentamos} {redução de 30% a 80%|economia significativa|desconto expressivo}.`,
    },
    {
      q: `{Posso|É possível} {manter|guardar|preservar} meu {carro|imóvel|bem} {durante|enquanto} {a negociação|o acordo}?`,
      a: `{Sim|Com certeza|Absolutamente}. {Conseguimos|É possível|Obtemos} {liminar|decisão judicial urgente|medida cautelar} que {suspende|paralisa|detém} {penhora|apreensão|restrição} {enquanto|durante|ao longo} da negociação.`,
    },
  ];

  return faqTemplates.map(item => ({
    question: spinText(item.q.replace(/{tipo}/g, tipo).replace(/{empresa}/g, empresa).replace(/{estado}/g, estado)),
    answer: spinText(item.a.replace(/{tipo}/g, tipo).replace(/{empresa}/g, empresa).replace(/{estado}/g, estado)),
  }));
}

/**
 * Gera empresas relacionadas para link interno
 */
export function gerarEmpresasRelacionadas(empresa, empresas, limite = 3) {
  const filtered = empresas.filter(e => e.slug !== empresa);
  return filtered.sort(() => Math.random() - 0.5).slice(0, limite);
}

/**
 * Gera cidades próximas para link interno
 */
export function gerarCidadesProximas(estado, cidades, limite = 3) {
  const filtered = cidades.filter(c => c.estado === estado);
  return filtered.sort(() => Math.random() - 0.5).slice(0, limite);
}
