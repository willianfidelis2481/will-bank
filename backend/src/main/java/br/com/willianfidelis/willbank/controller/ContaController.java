package br.com.willianfidelis.willbank.controller;

import org.springframework.beans.factory.annotation.Autowired; // pede ao Spring para injetar um objeto pronto
import org.springframework.http.HttpStatus; // representa os códigos de status HTTP (200, 201, 404...)
import org.springframework.http.ResponseEntity; // permite controlar corpo + status da resposta HTTP
import org.springframework.web.bind.annotation.*; // traz as anotações de mapeamento HTTP (@GetMapping, @PostMapping...)

import br.com.willianfidelis.willbank.entity.Conta;
import br.com.willianfidelis.willbank.service.ContaService;

import java.util.List; // tipo usado para retornar uma lista de contas

@RestController // avisa ao Spring: "essa classe responde a requisições HTTP e retorna dados
                // (não uma página HTML)"
@RequestMapping("/conta") // define o prefixo de URL comum a todos os métodos abaixo: tudo começa com
                          // /conta

public class ContaController {

    @Autowired // pede ao Spring para entregar um ContaService pronto para uso
    private ContaService contaService; // referência ao service, usada para executar as regras de negócio

    @PostMapping // responde a requisições HTTP POST em /conta (usado para CRIAR um novo
                 // registro)
    public ResponseEntity<Conta> criar(@RequestBody Conta conta) {
        // @RequestBody pega o JSON enviado pelo cliente e transforma automaticamente
        // num objeto Conta
        Conta novaConta = contaService.salvar(conta); // chama o service para salvar a conta no banco
        return ResponseEntity.status(HttpStatus.CREATED).body(novaConta);
        // retorna a conta criada + o status 201 (Created), avisando que deu certo
    }

    @GetMapping // responde a requisições HTTP GET em /conta (usado para LISTAR todos os
                // registros)
    public List<Conta> listar() {
        return contaService.listar(); // pede ao service a lista de todas as contas e devolve pro cliente
    }

    @GetMapping("/{numeroConta}") // responde a GET em /conta/123, por exemplo (busca UM registro específico)
    public ResponseEntity<Conta> buscar(@PathVariable Long numeroConta) {
        // @PathVariable pega o valor que veio na URL (o "123") e coloca na variável
        // numeroConta
        return contaService.buscarPorId(numeroConta)
                .map(ResponseEntity::ok) // se achou a conta, retorna ela com status 200 (OK)
                .orElse(ResponseEntity.notFound().build()); // se não achou, retorna status 404 (Not Found)
    }

    @PutMapping("/{numeroConta}") // responde a PUT em /conta/123 (usado para ATUALIZAR um registro existente)
    public ResponseEntity<Conta> atualizar(@PathVariable Long numeroConta, @RequestBody Conta conta) {
        if (contaService.buscarPorId(numeroConta).isEmpty()) {
            return ResponseEntity.notFound().build(); // se a conta não existe, retorna 404
        }
        conta.setNumeroConta(numeroConta); // garante que vai atualizar a conta da URL (e não criar outra)
        return ResponseEntity.ok(contaService.salvar(conta)); // o JPA faz UPDATE porque o id já existe
    }

    @DeleteMapping("/{numeroConta}") // responde a DELETE em /conta/123 (usado para EXCLUIR um registro)
    public ResponseEntity<Void> excluir(@PathVariable Long numeroConta) {
        contaService.excluir(numeroConta); // pede ao service para apagar a conta
        return ResponseEntity.noContent().build(); // retorna status 204 (No Content), avisando que apagou com sucesso
    }

}
