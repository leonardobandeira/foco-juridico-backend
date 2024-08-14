export default interface TipoMeta {
  id: number;
  nome: string;
  simbolo: string;
  alertas: {
    id: number;
    nome: string;
    frequencia: number;
    usuarioId: number;
    tipoMetaId: number;
  }[];
}