package br.com.willianfidelis.willbank.service;

import org.springframework.beans.factory.annotation.Autowired; // anotação que pede ao Spring para "injetar" um objeto pronto
import org.springframework.stereotype.Service; // anotação que marca esta classe como uma camada de serviço

import br.com.willianfidelis.willbank.entity.Conta;
import br.com.willianfidelis.willbank.repository.ContaRepository;

import java.util.List; // tipo usado para representar uma lista de contas
import java.util.Optional; // tipo usado quando um resultado pode existir ou não (evita erro de "nulo")

@Service // avisa ao Spring: "essa classe é um serviço, gerencie ela para mim" (permite
         // usar @Autowired nela depois)

public class ContaService {

    @Autowired // pede ao Spring: "me entregue um ContaRepository já pronto para uso, não
               // preciso criar na mão"
    private ContaRepository contaRepository; // referência ao repository, usada para acessar o banco de dados

    public Conta salvar(Conta conta) { // método que recebe uma Conta e salva no banco
        return contaRepository.save(conta); // chama o método pronto do repository (JpaRepository) que faz o
                                            // INSERT/UPDATE
    }

    public List<Conta> listar() { // método que retorna todas as contas cadastradas
        return contaRepository.findAll(); // chama o método pronto do repository que faz o SELECT * FROM conta
    }

    public Optional<Conta> buscarPorId(Long numeroConta) { // método que busca uma conta específica pelo número
        return contaRepository.findById(numeroConta); // retorna a conta se existir, ou "vazio" (Optional) se não
                                                      // existir
    }

    public void excluir(Long numeroConta) { // método que apaga uma conta pelo número
        contaRepository.deleteById(numeroConta); // chama o método pronto do repository que faz o DELETE
    }
}
