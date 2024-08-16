export interface Alerta {
  id: number
  usuarioId: number
  nome: string
  frequencia: number // quantidade de dias
  indicadorId: number
  tipoMetaId: number // <, >, =, <= ...
  valor: number // valor numerico
}
