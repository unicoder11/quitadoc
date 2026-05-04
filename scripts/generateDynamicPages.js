/**
 * Script para gerar todas as combinações de rotas dinâmicas
 * Suporta até 100.000+ páginas
 *
 * Uso: node scripts/generateDynamicPages.js
 */

const fs = require("fs")
const path = require("path")

async function generatePages() {
  try {
    const tipos = require("../data/tipos-divida.json")
    const empresas = require("../data/empresas.json")
    const estados = require("../data/estados.json")
    const cidades = require("../data/cidades.json")

    const combinations = []

    console.log("📊 Iniciando geração de combinações...")
    console.log(`   - ${tipos.length} tipos de dívida`)
    console.log(`   - ${empresas.length} empresas`)
    console.log(`   - ${estados.length} estados`)
    console.log(`   - ${cidades.length} cidades`)

    // Combinação 1: tipo + empresa + estado (mais específica)
    console.log("\n📍 Gerando: tipo + empresa + estado...")
    for (const tipo of tipos) {
      for (const empresa of empresas) {
        for (const estado of estados) {
          combinations.push({
            path: `/negociar-divida/${tipo.slug}/${empresa.slug}/${estado.slug}`,
            params: {
              tipo: tipo.slug,
              empresa: empresa.slug,
              estado: estado.slug,
            },
            priority: "0.9",
            changefreq: "weekly",
          })
        }
      }
    }
    console.log(`   ✓ ${tipos.length * empresas.length * estados.length} combinações criadas`)

    // Combinação 2: tipo + empresa
    console.log("\n📍 Gerando: tipo + empresa...")
    for (const tipo of tipos) {
      for (const empresa of empresas) {
        combinations.push({
          path: `/negociar-divida/${tipo.slug}/${empresa.slug}`,
          params: {
            tipo: tipo.slug,
            empresa: empresa.slug,
          },
          priority: "0.8",
          changefreq: "weekly",
        })
      }
    }
    console.log(`   ✓ ${tipos.length * empresas.length} combinações criadas`)

    // Combinação 3: tipo + estado
    console.log("\n📍 Gerando: tipo + estado...")
    for (const tipo of tipos) {
      for (const estado of estados) {
        combinations.push({
          path: `/negociar-divida/${tipo.slug}/${estado.slug}`,
          params: {
            tipo: tipo.slug,
            estado: estado.slug,
          },
          priority: "0.8",
          changefreq: "weekly",
        })
      }
    }
    console.log(`   ✓ ${tipos.length * estados.length} combinações criadas`)

    // Combinação 4: estado + cidade
    console.log("\n📍 Gerando: estado + cidade...")
    for (const estado of estados) {
      for (const cidade of cidades) {
        if (cidade.estado === estado.abrev) {
          combinations.push({
            path: `/negociar-divida/${estado.slug}/${cidade.slug}`,
            params: {
              estado: estado.slug,
              cidade: cidade.slug,
            },
            priority: "0.7",
            changefreq: "monthly",
          })
        }
      }
    }
    console.log(`   ✓ ${cidades.length} combinações criadas`)

    // Combinação 5: empresa isolada
    console.log("\n📍 Gerando: empresa isolada...")
    for (const empresa of empresas) {
      combinations.push({
        path: `/negociar-divida/${empresa.slug}`,
        params: {
          empresa: empresa.slug,
        },
        priority: "0.7",
        changefreq: "monthly",
      })
    }
    console.log(`   ✓ ${empresas.length} combinações criadas`)

    // Combinação 6: tipo isolado
    console.log("\n📍 Gerando: tipo isolado...")
    for (const tipo of tipos) {
      combinations.push({
        path: `/negociar-divida/${tipo.slug}`,
        params: {
          tipo: tipo.slug,
        },
        priority: "0.7",
        changefreq: "monthly",
      })
    }
    console.log(`   ✓ ${tipos.length} combinações criadas`)

    // Salvar cache JSON
    const cacheDir = path.join(process.cwd(), "data", "cache")
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }

    fs.writeFileSync(
      path.join(cacheDir, "dynamic-routes.json"),
      JSON.stringify(combinations, null, 2)
    )

    console.log(`\n✅ ${combinations.length} rotas totais geradas`)
    console.log(`📦 Cache salvo em: data/cache/dynamic-routes.json`)

    return combinations
  } catch (error) {
    console.error("❌ Erro ao gerar páginas:", error)
    process.exit(1)
  }
}

// Executar
if (require.main === module) {
  generatePages()
}

module.exports = generatePages
