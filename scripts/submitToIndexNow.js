#!/usr/bin/env node

/**
 * Script para submeter URLs para IndexNow/Bing automaticamente
 * 
 * Uso: npm run index:urls
 */

const fs = require("fs")
const path = require("path")

async function submitUrlsToIndexNow() {
  try {
    console.log("🚀 Iniciando submissão de URLs para IndexNow...")

    // Carregar rotas dinâmicas
    const cacheFile = path.join(
      process.cwd(),
      "data",
      "cache",
      "dynamic-routes.json"
    )

    if (!fs.existsSync(cacheFile)) {
      console.warn("⚠️  Cache de rotas não encontrado. Executando gerador...")
      const generatePages = require("./generateDynamicPages.js")
      await generatePages()
    }

    const routes = JSON.parse(fs.readFileSync(cacheFile, "utf-8"))
    const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.quitadoc.com.br"
    const apiKey = process.env.INDEXNOW_API_KEY || "test-key"

    console.log(`📊 ${routes.length} URLs encontradas`)

    // Construir lista de URLs
    const urls = routes.map(r => `${domain}${r.path}`)

    // Dividir em batches (máx 10k por requisição)
    const batchSize = 10000
    const batches = []

    for (let i = 0; i < urls.length; i += batchSize) {
      batches.push(urls.slice(i, i + batchSize))
    }

    console.log(`📦 Dividido em ${batches.length} batch(es)`)

    let totalSubmitted = 0

    // Submeter para Bing IndexNow
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]

      const payload = {
        host: new URL(domain).hostname,
        key: apiKey,
        keyLocation: `${domain}/indexnow.txt`,
        urlList: batch,
      }

      try {
        console.log(`\n📤 Enviando batch ${i + 1}/${batches.length}...`)

        const response = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          totalSubmitted += batch.length
          console.log(`✅ ${batch.length} URLs submetidas`)
        } else {
          const error = await response.text()
          console.error(`❌ Erro na resposta: ${response.status}`)
          console.error(error)
        }

        // Aguardar para não sobrecarregar API
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`❌ Erro ao enviar batch: ${error}`)
      }
    }

    console.log(`\n✅ Total de ${totalSubmitted} URLs submetidas para indexação`)
    console.log("⏰ Aguarde 24-48 horas para indexação completa")
  } catch (error) {
    console.error("❌ Erro:", error)
    process.exit(1)
  }
}

// Executar se for script principal
if (require.main === module) {
  submitUrlsToIndexNow()
}

module.exports = submitUrlsToIndexNow
