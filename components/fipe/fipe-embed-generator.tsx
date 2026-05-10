'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Copy, Check } from 'lucide-react'

interface EmbedCode {
  html: string
  width: string
  height: string
}

export function FipeEmbedGenerator() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [copied, setCopied] = useState(false)

  const generateEmbedCode = (): EmbedCode => {
    const baseUrl = 'https://www.quitadoc.com.br'
    const embedUrl = `${baseUrl}/embed/fipe${selectedBrand ? `?brand=${selectedBrand}` : ''}${selectedModel ? `&model=${selectedModel}` : ''}`

    return {
      html: `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" style="border: 1px solid #e5e7eb; border-radius: 8px;" title="Tabela FIPE - Preços de Veículos"></iframe>`,
      width: '100%',
      height: '600',
    }
  }

  const embedCode = generateEmbedCode()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode.html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Gerar Código de Embed</h2>
        <p className="text-muted-foreground">
          Adicione a tabela FIPE ao seu site com um simples código HTML
        </p>
      </div>

      {/* Configuration */}
      <Card className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Marca (opcional)
          </label>
          <Input
            placeholder="Ex: fiat"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Modelo (opcional)
          </label>
          <Input
            placeholder="Ex: uno"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          />
        </div>
      </Card>

      {/* Generated Code */}
      <Card className="p-6 space-y-4 bg-secondary/30">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Código HTML</h3>
          <Button
            onClick={copyToClipboard}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar
              </>
            )}
          </Button>
        </div>
        <div className="bg-background p-4 rounded-lg border border-border overflow-x-auto">
          <code className="text-sm font-mono text-foreground whitespace-pre-wrap break-all">
            {embedCode.html}
          </code>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Pré-visualização</h3>
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <iframe
            src={`https://www.quitadoc.com.br/embed/fipe${selectedBrand ? `?brand=${selectedBrand}` : ''}${selectedModel ? `&model=${selectedModel}` : ''}`}
            width="100%"
            height="600"
            frameBorder="0"
            style={{ borderRadius: '8px' }}
            title="Tabela FIPE Preview"
          />
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground mb-3">Como usar:</h3>
        <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
          <li>Copie o código HTML acima</li>
          <li>Acesse o HTML do seu site</li>
          <li>Cole o código onde deseja exibir a tabela FIPE</li>
          <li>Pronto! A tabela FIPE estará funcionando no seu site</li>
        </ol>
      </Card>

      {/* Benefits */}
      <Card className="p-6 border-success/20 bg-success/5">
        <h3 className="font-semibold text-foreground mb-3">Benefícios do Embed:</h3>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>Aumentar o tempo de permanência no seu site</li>
          <li>Gerar tráfego de backlinks para a QuitaDoc</li>
          <li>Fornecer valor aos seus visitantes</li>
          <li>Melhorar SEO com conteúdo atualizado automaticamente</li>
        </ul>
      </Card>
    </div>
  )
}
