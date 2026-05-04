#!/usr/bin/env node
/**
 * SEO Content Engine - Page Generator
 * Versão otimizada com dados embutidos
 */

import fs from 'fs'
import path from 'path'

// Criar diretório de output
const OUTPUT_DIR = './content/generated'
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Dados dos serviços (simplificado para execução)
const services = [
  { slug: 'busca-e-apreensao', name: 'Busca e Apreensão', shortName: 'BA', keywords: ['busca', 'apreensão', 'bens'], cluster: 'bens' },
  { slug: 'defesa-alienacao-fiduciaria', name: 'Defesa Alienação Fiduciária', shortName: 'DAF', keywords: ['alienação', 'fiduciária', 'defesa'], cluster: 'financeiro' },
  { slug: 'revisao-contrato-financiamento', name: 'Revisão de Contrato', shortName: 'RCF', keywords: ['revisão', 'contrato', 'financiamento'], cluster: 'financeiro' },
  { slug: 'reducao-juros-abusivos', name: 'Redução de Juros Abusivos', shortName: 'RJA', keywords: ['juros', 'abusivos', 'redução'], cluster: 'financeiro' },
  { slug: 'contestacao-leilao-veiculo', name: 'Contestação de Leilão', shortName: 'CLV', keywords: ['leilão', 'veículo', 'contestação'], cluster: 'bens' },
  { slug: 'consulta-gratuita', name: 'Consulta Gratuita', shortName: 'CG', keywords: ['consulta', 'gratuita', 'advogado'], cluster: 'consulta' },
  { slug: 'acao-cobranca', name: 'Ação de Cobrança', shortName: 'AC', keywords: ['cobrança', 'ação', 'dívida'], cluster: 'financeiro' },
  { slug: 'defesa-trabalhista', name: 'Defesa Trabalhista', shortName: 'DT', keywords: ['trabalhista', 'defesa', 'trabalho'], cluster: 'trabalhista' },
]

// Dados de cidades expandidos (170+ cidades para atingir 1000+)
const cities = [
  // São Paulo (20 cidades)
  { slug: 'sao-paulo-sp', name: 'São Paulo', state: 'SP', priority: 1, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'campinas-sp', name: 'Campinas', state: 'SP', priority: 2, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'sorocaba-sp', name: 'Sorocaba', state: 'SP', priority: 2, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'ribeirao-preto-sp', name: 'Ribeirão Preto', state: 'SP', priority: 2, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'santos-sp', name: 'Santos', state: 'SP', priority: 2, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'sao-bernardo-do-campo-sp', name: 'São Bernardo do Campo', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'santo-andre-sp', name: 'Santo André', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'sao-caetano-do-sul-sp', name: 'São Caetano do Sul', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'diadema-sp', name: 'Diadema', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'guaruja-sp', name: 'Guarujá', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'praia-grande-sp', name: 'Praia Grande', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'mogi-das-cruzes-sp', name: 'Mogi das Cruzes', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'taubate-sp', name: 'Taubaté', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'sao-jose-campos-sp', name: 'São José dos Campos', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'franca-sp', name: 'Franca', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'bauru-sp', name: 'Bauru', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'marilia-sp', name: 'Marília', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'piraju-sp', name: 'Piraju', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'itapeva-sp', name: 'Itapeva', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  { slug: 'americana-sp', name: 'Americana', state: 'SP', priority: 3, tribunal: 'TJ-SP', tribunalAcronym: 'TJ-SP' },
  
  // Rio de Janeiro (15 cidades)
  { slug: 'rio-de-janeiro-rj', name: 'Rio de Janeiro', state: 'RJ', priority: 1, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'niteroi-rj', name: 'Niterói', state: 'RJ', priority: 2, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'duque-de-caxias-rj', name: 'Duque de Caxias', state: 'RJ', priority: 2, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'sao-goncalo-rj', name: 'São Gonçalo', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'nova-iguacu-rj', name: 'Nova Iguaçu', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'campos-dos-goitacazes-rj', name: 'Campos dos Goitacazes', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'sao-joao-de-meriti-rj', name: 'São João de Meriti', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'volta-redonda-rj', name: 'Volta Redonda', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'magé-rj', name: 'Magé', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'itaborai-rj', name: 'Itaboraí', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'mesquita-rj', name: 'Mesquita', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'nilópolis-rj', name: 'Nilópolis', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'seropedica-rj', name: 'Seropédica', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'itaguai-rj', name: 'Itaguaí', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  { slug: 'marica-rj', name: 'Maricá', state: 'RJ', priority: 3, tribunal: 'TJ-RJ', tribunalAcronym: 'TJ-RJ' },
  
  // Minas Gerais (15 cidades)
  { slug: 'belo-horizonte-mg', name: 'Belo Horizonte', state: 'MG', priority: 1, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'uberlandia-mg', name: 'Uberlândia', state: 'MG', priority: 2, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'juiz-de-fora-mg', name: 'Juiz de Fora', state: 'MG', priority: 2, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'betim-mg', name: 'Betim', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'montes-claros-mg', name: 'Montes Claros', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'governador-valadares-mg', name: 'Governador Valadares', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'contagem-mg', name: 'Contagem', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'divinopolis-mg', name: 'Divinópolis', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'ipatinga-mg', name: 'Ipatinga', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'uberaba-mg', name: 'Uberaba', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'sete-lagoas-mg', name: 'Sete Lagoas', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'sabara-mg', name: 'Sabará', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'pampulha-mg', name: 'Pampulha', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'vespasiano-mg', name: 'Vespasiano', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  { slug: 'santa-luzia-mg', name: 'Santa Luzia', state: 'MG', priority: 3, tribunal: 'TJ-MG', tribunalAcronym: 'TJ-MG' },
  
  // Bahia (15 cidades)
  { slug: 'salvador-ba', name: 'Salvador', state: 'BA', priority: 1, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'feira-de-santana-ba', name: 'Feira de Santana', state: 'BA', priority: 2, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'vitoria-da-conquista-ba', name: 'Vitória da Conquista', state: 'BA', priority: 2, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'ilheus-ba', name: 'Ilhéus', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'itabuna-ba', name: 'Itabuna', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'jequie-ba', name: 'Jequié', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'paulo-afonso-ba', name: 'Paulo Afonso', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'alagoinhas-ba', name: 'Alagoinhas', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'barreiras-ba', name: 'Barreiras', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'santo-estevao-ba', name: 'Santo Estêvão', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'gandu-ba', name: 'Gandu', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'guanambi-ba', name: 'Guanambi', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'porto-seguro-ba', name: 'Porto Seguro', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'morro-do-chapeu-ba', name: 'Morro do Chapéu', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  { slug: 'senhor-do-bonfim-ba', name: 'Senhor do Bonfim', state: 'BA', priority: 3, tribunal: 'TJ-BA', tribunalAcronym: 'TJ-BA' },
  
  // Ceará (12 cidades)
  { slug: 'fortaleza-ce', name: 'Fortaleza', state: 'CE', priority: 1, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'caucaia-ce', name: 'Caucaia', state: 'CE', priority: 2, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'juazeiro-do-norte-ce', name: 'Juazeiro do Norte', state: 'CE', priority: 2, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'maracanaú-ce', name: 'Maracanaú', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'itapipoca-ce', name: 'Itapipoca', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'sobral-ce', name: 'Sobral', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'crato-ce', name: 'Crato', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'iguatu-ce', name: 'Iguatu', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'quixada-ce', name: 'Quixadá', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'pacajus-ce', name: 'Pacajus', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'horizonte-ce', name: 'Horizonte', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  { slug: 'pacoti-ce', name: 'Pacoti', state: 'CE', priority: 3, tribunal: 'TJ-CE', tribunalAcronym: 'TJ-CE' },
  
  // Pernambuco (12 cidades)
  { slug: 'recife-pe', name: 'Recife', state: 'PE', priority: 1, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'jaboatao-dos-guararapes-pe', name: 'Jaboatão dos Guararapes', state: 'PE', priority: 2, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'olinda-pe', name: 'Olinda', state: 'PE', priority: 2, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'caruaru-pe', name: 'Caruaru', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'petrolina-pe', name: 'Petrolina', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'paulista-pe', name: 'Paulista', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'camaragibe-pe', name: 'Camaragibe', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'garanhuns-pe', name: 'Garanhuns', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'vitoria-de-santo-antao-pe', name: 'Vitória de Santo Antão', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'goiana-pe', name: 'Goiana', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'ipoji-pe', name: 'Ipojí', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  { slug: 'arcoverde-pe', name: 'Arcoverde', state: 'PE', priority: 3, tribunal: 'TJ-PE', tribunalAcronym: 'TJ-PE' },
  
  // Rio Grande do Sul (20 cidades)
  { slug: 'porto-alegre-rs', name: 'Porto Alegre', state: 'RS', priority: 1, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'caxias-do-sul-rs', name: 'Caxias do Sul', state: 'RS', priority: 2, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'pelotas-rs', name: 'Pelotas', state: 'RS', priority: 2, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'santa-maria-rs', name: 'Santa Maria', state: 'RS', priority: 2, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'canoas-rs', name: 'Canoas', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'gravatai-rs', name: 'Gravataí', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'viamao-rs', name: 'Viamão', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'alvorada-rs', name: 'Alvorada', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'novo-hamburgo-rs', name: 'Novo Hamburgo', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'sao-leopoldo-rs', name: 'São Leopoldo', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'sapucaia-do-sul-rs', name: 'Sapucaia do Sul', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'esteio-rs', name: 'Esteio', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'campo-bom-rs', name: 'Campo Bom', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'sapucaia-rs', name: 'Sapucaia', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'gravataí-rs', name: 'Gravataí', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'cruz-alta-rs', name: 'Cruz Alta', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'passo-fundo-rs', name: 'Passo Fundo', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'santiago-rs', name: 'Santiago', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'bagé-rs', name: 'Bagé', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  { slug: 'jaguarao-rs', name: 'Jaguarão', state: 'RS', priority: 3, tribunal: 'TJ-RS', tribunalAcronym: 'TJ-RS' },
  
  // Paraná (15 cidades)
  { slug: 'curitiba-pr', name: 'Curitiba', state: 'PR', priority: 1, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'londrina-pr', name: 'Londrina', state: 'PR', priority: 2, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'maringá-pr', name: 'Maringá', state: 'PR', priority: 2, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'ponta-grossa-pr', name: 'Ponta Grossa', state: 'PR', priority: 2, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'cascavel-pr', name: 'Cascavel', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'sao-jose-dos-pinhais-pr', name: 'São José dos Pinhais', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'guarapuava-pr', name: 'Guarapuava', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'toledo-pr', name: 'Toledo', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'foz-do-iguacu-pr', name: 'Foz do Iguaçu', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'apucarana-pr', name: 'Apucarana', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'araucaria-pr', name: 'Araucária', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'campo-mourao-pr', name: 'Campo Mourão', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'paranagua-pr', name: 'Paranaguá', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'cornelia-pr', name: 'Cornélia', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  { slug: 'telêmaco-borba-pr', name: 'Telêmaco Borba', state: 'PR', priority: 3, tribunal: 'TJ-PR', tribunalAcronym: 'TJ-PR' },
  
  // Santa Catarina (12 cidades)
  { slug: 'florianopolis-sc', name: 'Florianópolis', state: 'SC', priority: 1, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'joinville-sc', name: 'Joinville', state: 'SC', priority: 2, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'blumenau-sc', name: 'Blumenau', state: 'SC', priority: 2, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'chapeco-sc', name: 'Chapecó', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'itajai-sc', name: 'Itajaí', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'brusque-sc', name: 'Brusque', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'criciuma-sc', name: 'Criciúma', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'tubarao-sc', name: 'Tubarão', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'lages-sc', name: 'Lages', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'camboru-sc', name: 'Camboriú', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'navegantes-sc', name: 'Navegantes', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  { slug: 'jaraguá-do-sul-sc', name: 'Jaraguá do Sul', state: 'SC', priority: 3, tribunal: 'TJ-SC', tribunalAcronym: 'TJ-SC' },
  
  // Distrito Federal
  { slug: 'brasilia-df', name: 'Brasília', state: 'DF', priority: 1, tribunal: 'TJ-DF', tribunalAcronym: 'TJ-DF' },
  
  // Goiás (8 cidades)
  { slug: 'goiania-go', name: 'Goiânia', state: 'GO', priority: 1, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  { slug: 'aparecida-de-goiania-go', name: 'Aparecida de Goiânia', state: 'GO', priority: 2, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  { slug: 'anapolis-go', name: 'Anápolis', state: 'GO', priority: 2, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  { slug: 'rio-verde-go', name: 'Rio Verde', state: 'GO', priority: 3, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  { slug: 'jatai-go', name: 'Jataí', state: 'GO', priority: 3, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  { slug: 'inhumas-go', name: 'Inhumas', state: 'GO', priority: 3, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  { slug: 'mineiros-go', name: 'Mineiros', state: 'GO', priority: 3, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  { slug: 'luziania-go', name: 'Luziânia', state: 'GO', priority: 3, tribunal: 'TJ-GO', tribunalAcronym: 'TJ-GO' },
  
  // Mato Grosso do Sul (8 cidades)
  { slug: 'campo-grande-ms', name: 'Campo Grande', state: 'MS', priority: 1, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  { slug: 'dourados-ms', name: 'Dourados', state: 'MS', priority: 2, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  { slug: 'corumba-ms', name: 'Corumbá', state: 'MS', priority: 3, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  { slug: 'tres-lagoas-ms', name: 'Três Lagoas', state: 'MS', priority: 3, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  { slug: 'aquidauana-ms', name: 'Aquidauana', state: 'MS', priority: 3, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  { slug: 'ponta-pora-ms', name: 'Ponta Porã', state: 'MS', priority: 3, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  { slug: 'naviraí-ms', name: 'Naviraí', state: 'MS', priority: 3, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  { slug: 'maracaju-ms', name: 'Maracaju', state: 'MS', priority: 3, tribunal: 'TJ-MS', tribunalAcronym: 'TJ-MS' },
  
  // Mato Grosso (6 cidades)
  { slug: 'cuiaba-mt', name: 'Cuiabá', state: 'MT', priority: 1, tribunal: 'TJ-MT', tribunalAcronym: 'TJ-MT' },
  { slug: 'varzea-grande-mt', name: 'Várzea Grande', state: 'MT', priority: 2, tribunal: 'TJ-MT', tribunalAcronym: 'TJ-MT' },
  { slug: 'rondonopolis-mt', name: 'Rondonópolis', state: 'MT', priority: 2, tribunal: 'TJ-MT', tribunalAcronym: 'TJ-MT' },
  { slug: 'sinop-mt', name: 'Sinop', state: 'MT', priority: 3, tribunal: 'TJ-MT', tribunalAcronym: 'TJ-MT' },
  { slug: 'lucas-do-rio-verde-mt', name: 'Lucas do Rio Verde', state: 'MT', priority: 3, tribunal: 'TJ-MT', tribunalAcronym: 'TJ-MT' },
  { slug: 'tangara-da-serra-mt', name: 'Tangará da Serra', state: 'MT', priority: 3, tribunal: 'TJ-MT', tribunalAcronym: 'TJ-MT' },
  
  // Amazonas (4 cidades)
  { slug: 'manaus-am', name: 'Manaus', state: 'AM', priority: 1, tribunal: 'TJ-AM', tribunalAcronym: 'TJ-AM' },
  { slug: 'parintins-am', name: 'Parintins', state: 'AM', priority: 3, tribunal: 'TJ-AM', tribunalAcronym: 'TJ-AM' },
  { slug: 'itacoatiara-am', name: 'Itacoatiara', state: 'AM', priority: 3, tribunal: 'TJ-AM', tribunalAcronym: 'TJ-AM' },
  { slug: 'coari-am', name: 'Coari', state: 'AM', priority: 3, tribunal: 'TJ-AM', tribunalAcronym: 'TJ-AM' },
  
  // Pará (6 cidades)
  { slug: 'belem-pa', name: 'Belém', state: 'PA', priority: 1, tribunal: 'TJ-PA', tribunalAcronym: 'TJ-PA' },
  { slug: 'ananindeua-pa', name: 'Ananindeua', state: 'PA', priority: 2, tribunal: 'TJ-PA', tribunalAcronym: 'TJ-PA' },
  { slug: 'santarem-pa', name: 'Santarém', state: 'PA', priority: 2, tribunal: 'TJ-PA', tribunalAcronym: 'TJ-PA' },
  { slug: 'maraba-pa', name: 'Marabá', state: 'PA', priority: 3, tribunal: 'TJ-PA', tribunalAcronym: 'TJ-PA' },
  { slug: 'tucurui-pa', name: 'Tucuruí', state: 'PA', priority: 3, tribunal: 'TJ-PA', tribunalAcronym: 'TJ-PA' },
  { slug: 'parauapebas-pa', name: 'Parauapebas', state: 'PA', priority: 3, tribunal: 'TJ-PA', tribunalAcronym: 'TJ-PA' },
  
  // Outros estados (36 cidades para atingir 1000+)
  { slug: 'teresina-pi', name: 'Teresina', state: 'PI', priority: 1, tribunal: 'TJ-PI', tribunalAcronym: 'TJ-PI' },
  { slug: 'picos-pi', name: 'Picos', state: 'PI', priority: 3, tribunal: 'TJ-PI', tribunalAcronym: 'TJ-PI' },
  { slug: 'parnaiba-pi', name: 'Parnaíba', state: 'PI', priority: 3, tribunal: 'TJ-PI', tribunalAcronym: 'TJ-PI' },
  { slug: 'sao-luis-ma', name: 'São Luís', state: 'MA', priority: 1, tribunal: 'TJ-MA', tribunalAcronym: 'TJ-MA' },
  { slug: 'sao-jose-de-ribamar-ma', name: 'São José de Ribamar', state: 'MA', priority: 2, tribunal: 'TJ-MA', tribunalAcronym: 'TJ-MA' },
  { slug: 'imperatriz-ma', name: 'Imperatriz', state: 'MA', priority: 2, tribunal: 'TJ-MA', tribunalAcronym: 'TJ-MA' },
  { slug: 'natal-rn', name: 'Natal', state: 'RN', priority: 1, tribunal: 'TJ-RN', tribunalAcronym: 'TJ-RN' },
  { slug: 'parnamirim-rn', name: 'Parnamirim', state: 'RN', priority: 2, tribunal: 'TJ-RN', tribunalAcronym: 'TJ-RN' },
  { slug: 'mossoro-rn', name: 'Mossoró', state: 'RN', priority: 2, tribunal: 'TJ-RN', tribunalAcronym: 'TJ-RN' },
  { slug: 'joao-pessoa-pb', name: 'João Pessoa', state: 'PB', priority: 1, tribunal: 'TJ-PB', tribunalAcronym: 'TJ-PB' },
  { slug: 'campina-grande-pb', name: 'Campina Grande', state: 'PB', priority: 2, tribunal: 'TJ-PB', tribunalAcronym: 'TJ-PB' },
  { slug: 'patos-pb', name: 'Patos', state: 'PB', priority: 3, tribunal: 'TJ-PB', tribunalAcronym: 'TJ-PB' },
  { slug: 'maceio-al', name: 'Maceió', state: 'AL', priority: 1, tribunal: 'TJ-AL', tribunalAcronym: 'TJ-AL' },
  { slug: 'rio-largo-al', name: 'Rio Largo', state: 'AL', priority: 2, tribunal: 'TJ-AL', tribunalAcronym: 'TJ-AL' },
  { slug: 'arapiraca-al', name: 'Arapiraca', state: 'AL', priority: 2, tribunal: 'TJ-AL', tribunalAcronym: 'TJ-AL' },
  { slug: 'aracaju-se', name: 'Aracaju', state: 'SE', priority: 1, tribunal: 'TJ-SE', tribunalAcronym: 'TJ-SE' },
  { slug: 'nossa-senhora-do-socorro-se', name: 'Nossa Senhora do Socorro', state: 'SE', priority: 2, tribunal: 'TJ-SE', tribunalAcronym: 'TJ-SE' },
  { slug: 'lagarto-se', name: 'Lagarto', state: 'SE', priority: 3, tribunal: 'TJ-SE', tribunalAcronym: 'TJ-SE' },
  { slug: 'vitoria-es', name: 'Vitória', state: 'ES', priority: 1, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'vila-velha-es', name: 'Vila Velha', state: 'ES', priority: 2, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'serra-es', name: 'Serra', state: 'ES', priority: 2, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'cariacica-es', name: 'Cariacica', state: 'ES', priority: 3, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'linhares-es', name: 'Linhares', state: 'ES', priority: 3, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'colatina-es', name: 'Colatina', state: 'ES', priority: 3, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'guarapari-es', name: 'Guarapari', state: 'ES', priority: 3, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'aracruz-es', name: 'Aracruz', state: 'ES', priority: 3, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'cachoeiro-de-itapemirim-es', name: 'Cachoeiro de Itapemirim', state: 'ES', priority: 3, tribunal: 'TJ-ES', tribunalAcronym: 'TJ-ES' },
  { slug: 'roraima-boa-vista', name: 'Boa Vista', state: 'RR', priority: 1, tribunal: 'TJ-RR', tribunalAcronym: 'TJ-RR' },
  { slug: 'amapa-macapa', name: 'Macapá', state: 'AP', priority: 1, tribunal: 'TJ-AP', tribunalAcronym: 'TJ-AP' },
  { slug: 'tocantins-palmas', name: 'Palmas', state: 'TO', priority: 1, tribunal: 'TJ-TO', tribunalAcronym: 'TJ-TO' },
  { slug: 'acre-rio-branco', name: 'Rio Branco', state: 'AC', priority: 1, tribunal: 'TJ-AC', tribunalAcronym: 'TJ-AC' },
]

// Gerar páginas service x city
function generateServiceCityPages() {
  const pages = []
  for (const service of services) {
    for (const city of cities) {
      pages.push({
        type: 'service-city',
        service: service.slug,
        city: city.slug,
        url: `/${service.slug}/${city.slug}`,
        title: `${service.name} em ${city.name} - ${city.state}`,
        description: `${service.name} especializado em ${city.name}, ${city.state}. Atendimento no ${city.tribunalAcronym}.`,
        keywords: [...service.keywords, city.name, city.state],
        priority: city.priority,
      })
    }
  }
  return pages
}

// Main
console.log('🚀 Starting SEO Content Engine...\n')

const serviceCityPages = generateServiceCityPages()

console.log(`📊 Generated data:`)
console.log(`   - ${services.length} services`)
console.log(`   - ${cities.length} cities`)
console.log(`   - ${serviceCityPages.length} service x city combinations\n`)

// Calcular estatísticas
const stats = {
  totalPages: serviceCityPages.length,
  services: services.length,
  cities: cities.length,
  priority1: serviceCityPages.filter(p => p.priority === 1).length,
  priority2: serviceCityPages.filter(p => p.priority === 2).length,
  priority3: serviceCityPages.filter(p => p.priority === 3).length,
}

// Salvar arquivos
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'service-city-pages.json'),
  JSON.stringify(serviceCityPages, null, 2)
)

// Gerar relatório
const report = `
=====================================
SEO Content Engine - Generation Report
=====================================
Generated: ${new Date().toISOString()}

TOTAL PAGES: ${stats.totalPages}

Coverage:
- Services: ${stats.services}
- Cities: ${stats.cities}
- Combinations: ${stats.services} x ${stats.cities} = ${stats.totalPages}

Priority Distribution:
- Priority 1 (Capitals): ${stats.priority1} pages
- Priority 2 (Large cities): ${stats.priority2} pages
- Priority 3 (Other cities): ${stats.priority3} pages

Potential Expansion:
- Add 20 more cities = ${stats.services * (stats.cities + 20)} pages total
- Add 3 more services = ${(stats.services + 3) * stats.cities} pages total
- Add both = ${(stats.services + 3) * (stats.cities + 20)} pages total (1000+)

=====================================
`

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'generation-report.txt'),
  report
)

console.log(report)
console.log(`✅ Files saved to: ${OUTPUT_DIR}`)
console.log(`   - service-city-pages.json (${serviceCityPages.length} pages)`)
console.log(`   - generation-report.txt`)
