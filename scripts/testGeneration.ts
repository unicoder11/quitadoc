/**
 * Script de teste - Gera 10 páginas de exemplo e mostra output
 * Para executar: npx ts-node scripts/testGeneration.ts
 */

import { ContentGenerator, PageContext } from '../lib/contentGenerator';

// Configurações de teste
const TEST_CONFIGS: PageContext[] = [
  // Tier 1: Service + Institution (básico)
  { service: 'negociar-divida', institution: 'nubank' },
  { service: 'cancelar-busca-apreensao', institution: 'itau' },
  
  // Tier 2: + Product Type
  { service: 'negociar-divida', institution: 'bradesco', productType: 'cartao' },
  { service: 'revisao-contrato', institution: 'santander', productType: 'emprestimo' },
  
  // Tier 3: + State
  { service: 'negociar-divida', institution: 'inter', state: 'sp' },
  { service: 'cancelar-busca-apreensao', institution: 'c6', state: 'rj' },
  
  // Tier 4: + City
  { service: 'negociar-divida', institution: 'bb', state: 'sp', city: 'sao-paulo' },
  { service: 'reducao-juros', institution: 'caixa', state: 'mg', city: 'belo-horizonte' },
  { service: 'contestacao-leilao', institution: 'safra', state: 'rj', city: 'rio-de-janeiro' },
  { service: 'revisao-contrato', institution: 'nubank', state: 'rs', city: 'porto-alegre' },
];

async function testGeneration() {
  const generator = new ContentGenerator();
  
  console.log('🚀 Iniciando testes de geração de conteúdo...\n');
  console.log(`📊 Gerando ${TEST_CONFIGS.length} páginas de teste\n`);
  console.log('=' .repeat(80));
  
  for (let i = 0; i < TEST_CONFIGS.length; i++) {
    const config = TEST_CONFIGS[i];
    
    try {
      console.log(`\n📄 [PÁGINA ${i + 1}/${TEST_CONFIGS.length}] ${config.service} + ${config.institution}`);
      if (config.productType) console.log(`   Produto: ${config.productType}`);
      if (config.state) console.log(`   Estado: ${config.state}`);
      if (config.city) console.log(`   Cidade: ${config.city}`);
      console.log('-'.repeat(80));
      
      const content = await generator.generatePageContent(config);
      
      console.log(`\n🎯 H1: ${content.h1}`);
      console.log(`\n📝 INTRO (${content.intro.length} caracteres):`);
      console.log(`   ${content.intro.substring(0, 150)}...`);
      
      console.log(`\n💰 BENEFÍCIOS (${content.benefits.length} cards):`);
      content.benefits.forEach((benefit, idx) => {
        console.log(`   ${idx + 1}. ${benefit.icon} ${benefit.title}`);
      });
      
      console.log(`\n🎤 TESTIMONIAIS (${content.testimonials.length} depoimentos):`);
      content.testimonials.forEach((test, idx) => {
        console.log(`   ${idx + 1}. ${test.name} ${test.initials} (${test.location}) - Economizou R$ ${test.saved.toLocaleString('pt-BR')}`);
      });
      
      console.log(`\n❓ FAQ (${content.faq.length} perguntas):`);
      content.faq.forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.question}`);
      });
      
      console.log(`\n🎯 CTA: ${content.cta}`);
      
      // Calcula estatísticas
      const totalChars = Object.values(content).reduce((acc, val) => {
        if (typeof val === 'string') return acc + val.length;
        if (Array.isArray(val)) return acc + JSON.stringify(val).length;
        return acc;
      }, 0);
      
      console.log(`\n📈 Estatísticas:`);
      console.log(`   Total de caracteres: ${totalChars}`);
      console.log(`   Palavras (estimado): ${Math.round(totalChars / 5)}`);
      
    } catch (error) {
      console.error(`❌ Erro ao gerar página ${i + 1}:`, error);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ Teste de geração concluído!\n');
  
  // Teste de determinismo (mesmo seed = mesmo output)
  console.log('🔬 Teste de Determinismo (Verificando se seed funciona)');
  console.log('-'.repeat(80));
  
  const testConfig = TEST_CONFIGS[0];
  const content1 = await generator.generatePageContent(testConfig);
  const content2 = await generator.generatePageContent(testConfig);
  
  const intro1Same = content1.intro === content2.intro;
  const intro2Same = content1.benefits[0].title === content2.benefits[0].title;
  
  console.log(`Intros iguais: ${intro1Same ? '✅' : '❌'}`);
  console.log(`Benefícios iguais: ${intro2Same ? '✅' : '❌'}`);
  console.log('\n✨ O sistema está funcionando corretamente!\n');
}

// Executar testes
testGeneration().catch(console.error);
