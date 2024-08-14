export default interface Indicador {
  id: number;
  nome: string;
  tipoIndicadorId: number;
  tipoIndicador: {
    id: number;
    nome: string;
  };
  painelId: number;
  painel: {
    id: number;
    nome: string;
  };
  alertas: {
    id: number;
    nome: string;
    frequencia: number;
    usuarioId: number;
    tipoMetaId: number;
  }[];
}
