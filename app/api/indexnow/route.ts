import { NextRequest, NextResponse } from "next/server"
import tiposData from "@/data/tipos-divida.json"
import empresasData from "@/data/empresas.json"
import estadosData from "@/data/estados.json"

/**
 * API IndexNow para submissão automática de URLs
 * Envia URLs para indexação rápida no Bing, Yandex, etc
 */

const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.quitadoc.com.br"

// Gera URLs prioritarias automaticamente
function generatePriorityUrls(): string[] {
  const urls: string[] = []
  const tipos = tiposData as Array<{ slug: string }>
  const empresas = empresasData as Array<{ slug: string }>
  const estados = estadosData as Array<{ slug: string }>

  // Paginas estaticas
  ;["/", "/simulador", "/negociar-divida", "/consulta-gratuita", "/como-funciona", "/casos-de-sucesso", "/cancelar-busca-apreensao"].forEach(p => urls.push(`${domain}${p}`))

  // Tipos de divida
  tipos.slice(0, 15).forEach(t => urls.push(`${domain}/negociar-divida/${t.slug}`))

  // Tipo + Empresa (alta conversao)
  tipos.slice(0, 5).forEach(t => {
    empresas.slice(0, 15).forEach(e => urls.push(`${domain}/negociar-divida/${t.slug}/${e.slug}`))
  })

  // Tipo + Estado
  tipos.slice(0, 5).forEach(t => {
    estados.forEach(e => urls.push(`${domain}/negociar-divida/${t.slug}/${e.slug}`))
  })

  return urls
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const urls = Array.isArray(body) ? body : generatePriorityUrls()

    if (urls.length === 0) {
      return NextResponse.json(
        { error: "URLs array is required" },
        { status: 400 }
      )
    }

    const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://www.quitadoc.com.br"
    const apiKey = process.env.INDEXNOW_API_KEY || "test-key"

    // Batcher de URLs (máximo 10k por requisição)
    const batches = []
    for (let i = 0; i < urls.length; i += 10000) {
      batches.push(urls.slice(i, i + 10000))
    }

    let totalSubmitted = 0

    // Submeter para IndexNow
    for (const batch of batches) {
      const payload = {
        host: new URL(domain).hostname,
        key: apiKey,
        keyLocation: `${domain}/indexnow.txt`,
        urlList: batch,
      }

      try {
        // Bing IndexNow
        await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        totalSubmitted += batch.length
      } catch (error) {
        console.error("Erro ao submeter para IndexNow:", error)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `${totalSubmitted} URLs submetidas para indexação`,
        count: totalSubmitted,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro na API IndexNow:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET - Retorna URLs geradas para inspecao
export async function GET() {
  const urls = generatePriorityUrls()
  return NextResponse.json({
    totalUrls: urls.length,
    sampleUrls: urls.slice(0, 30),
    message: "POST para submeter URLs para indexacao",
  })
}
