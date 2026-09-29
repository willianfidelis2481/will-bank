package br.com.willianfidelis.willbank.entity; // pacote onde essa classe vive, tem que bater com a pasta física do arquivo

import jakarta.persistence.Column; // anotação usada para configurar as colunas da tabela no banco
import jakarta.persistence.Entity; // anotação que transforma a classe em uma entidade JPA (uma tabela)
import jakarta.persistence.GeneratedValue; // anotação que faz o banco gerar o valor da chave primária sozinho
import jakarta.persistence.Id; // anotação que marca qual campo é a chave primária da tabela
import lombok.AllArgsConstructor; // anotação do Lombok que gera um construtor com todos os campos
import lombok.Data; // anotação do Lombok que gera getters, setters, equals, hashCode e toString
import lombok.NoArgsConstructor; // anotação do Lombok que gera um construtor vazio (sem argumentos)

@Entity // diz ao Spring/Hibernate: "crie uma tabela no banco para esta classe"
@Data // gera automaticamente getters/setters/equals/hashCode/toString (sem precisar
      // escrever na mão)
@NoArgsConstructor // gera o construtor Conta() -- o JPA exige isso para poder instanciar o objeto
                   // vazio
@AllArgsConstructor // gera o construtor Conta(numeroConta, numeroAgencia, titular, saldo) -- útil
                    // para criar objetos prontos

public class Conta { // início da classe que representa a tabela "conta" no banco de dados

    @Id // marca este campo como a chave primária (identifica cada registro de forma
        // única)
    @GeneratedValue // o valor deste campo é gerado automaticamente pelo banco (não preenchemos na
                    // mão)
    private Long numeroConta; // atributo que guarda o número da conta (chave primária)

    @Column(nullable = false) // cria a coluna no banco e torna o preenchimento obrigatório (não aceita nulo)
    private Integer numeroAgencia; // atributo que guarda o número da agência

    @Column(nullable = false, length = 50) // coluna obrigatória, com limite de 50 caracteres
    private String titular; // atributo que guarda o nome do titular da conta

    @Column(nullable = false) // coluna obrigatória
    private Double saldo; // atributo que guarda o saldo atual da conta
}
