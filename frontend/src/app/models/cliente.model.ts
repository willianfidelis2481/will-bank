// Representa o JSON que a API devolve/recebe em /cliente
// (mesmos campos da entidade Cliente.java do back-end)
export interface Cliente {
  id?: number; // opcional: na criação quem gera é o banco
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
}
