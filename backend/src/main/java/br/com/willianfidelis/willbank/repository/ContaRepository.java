package br.com.willianfidelis.willbank.repository;

import org.springframework.data.jpa.repository.JpaRepository; // interface pronta do Spring que já traz métodos de CRUD

import br.com.willianfidelis.willbank.entity.Conta;

public interface ContaRepository extends JpaRepository<Conta, Long> { // interface que herda os métodos de CRUD do
                                                                      // JpaRepository, com a entidade Conta e chave
                                                                      // primária Long
    // "extends JpaRepository<Conta, Long>" quer dizer:
    // - Conta -> qual entidade este repository gerencia
    // - Long -> qual o tipo da chave primária dessa entidade (numeroConta é Long)
    //
    // Ao estender JpaRepository, você ganha de graça, sem escrever nada, métodos
    // como:
    // save(conta) -> salva ou atualiza uma conta
    // findById(id) -> busca uma conta pelo numeroConta
    // findAll() -> lista todas as contas
    // deleteById(id) -> exclui uma conta pelo numeroConta
    // e vários outros

}
