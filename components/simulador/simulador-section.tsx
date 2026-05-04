"use client"

import { SimuladorDivida } from "./simulador-divida"

export default function SimuladorSection({ 
  tipoPreSelecionado = "",
  bancoPreSelecionado = "" 
}: {
  tipoPreSelecionado?: string
  bancoPreSelecionado?: string
}) {
  return (
    <SimuladorDivida 
      tipoPreSelecionado={tipoPreSelecionado}
      bancoPreSelecionado={bancoPreSelecionado}
    />
  )
}
