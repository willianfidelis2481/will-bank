package br.com.willianfidelis.willbank.entity;

import jakarta.persistence.Column; // configura as colunas da tabela no banco
import jakarta.persistence.Entity; // transforma a classe numa entidade JPA (tabela)
import jakarta.persistence.GeneratedValue; // faz o banco gerar o valor da chave primária sozinho
import jakarta.persistence.Id; // marca qual campo é a chave primária
import lombok.AllArgsConstructor; // gera um construtor com todos os campos
import lombok.Data; // gera getters, setters, equals, hashCode e toString
import lombok.NoArgsConstructor;

@Entity // vira uma tabela chamada "cliente" no banco
@Data // Lombok gera getters, setters, equals, toString sozinho
@NoArgsConstructor // gera Cliente() -- o JPA precisa criar o objeto vazio primeiro
@AllArgsConstructor // gera Cliente(id, nome, cpf, email, telefone)// gera um construtor vazio (sem
                    // argumentos)

public class Cliente {

    @Id // esse campo é a chave primária
    @GeneratedValue // o banco gera o valor sozinho
    private Long id;

    @Column(nullable = false, length = 100) // obrigatório, até 100 caracteres
    private String nome;

    @Column(nullable = false, length = 11) // obrigatório, CPF tem 11 dígitos
    private String cpf;

    @Column(nullable = false, length = 100) // obrigatório
    private String email;

    @Column(length = 20) // opcional (sem nullable = false)
    private String telefone;

}
