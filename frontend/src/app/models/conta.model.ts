// Representa o JSON que a API devolve/recebe em /conta
// (mesmos campos da entidade Conta.java do back-end)
export interface Conta {
  numeroConta?: number; // opcional: na criação quem gera é o banco
  numeroAgencia: number;
  titular: string;
  saldo: number;
}
