export default interface Painel {
  id: number;
  nome: string;
  descricao: string;
  endereco: string;
  grupoId: number;
  grupo: {
    id: number;
    nome: string;
  };
  indicadores: {
    id: number;
    nome: string;
    tipoIndicadorId: number;
  }[];
}
