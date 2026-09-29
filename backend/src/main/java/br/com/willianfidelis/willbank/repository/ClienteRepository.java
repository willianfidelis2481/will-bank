package br.com.willianfidelis.willbank.repository;

import br.com.willianfidelis.willbank.entity.Cliente; // Cliente está em outro pacote agora, precisa importar
import org.springframework.data.jpa.repository.JpaRepository; // interface pronta que já traz métodos de CRUD

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // Cliente -> qual entidade este repository gerencia
    // Long -> o tipo da chave primária (id)
    //
    // De graça, sem escrever nada, você ganha:
    // save(cliente), findById(id), findAll(), deleteById(id) ...

}
