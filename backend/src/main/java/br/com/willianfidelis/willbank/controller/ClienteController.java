package br.com.willianfidelis.willbank.controller;

import br.com.willianfidelis.willbank.entity.Cliente; // Cliente está no pacote entity
import br.com.willianfidelis.willbank.service.ClienteService; // ClienteService está no pacote service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // esta classe responde HTTP e devolve dados (não uma página)
@RequestMapping("/cliente") // todo endpoint aqui começa com /cliente

public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping // POST /cliente -> criar
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.salvar(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente); // 201
    }

    @GetMapping // GET /cliente -> listar todos
    public List<Cliente> listar() {
        return clienteService.listar();
    }

    @GetMapping("/{id}") // GET /cliente/1 -> buscar um
    public ResponseEntity<Cliente> buscar(@PathVariable Long id) {
        return clienteService.buscarPorId(id)
                .map(ResponseEntity::ok) // achou -> 200
                .orElse(ResponseEntity.notFound().build()); // não achou -> 404
    }

    @PutMapping("/{id}") // PUT /cliente/1 -> atualizar
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        if (clienteService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build(); // não existe -> 404
        }
        cliente.setId(id); // garante que vai atualizar o registro da URL (e não criar outro)
        return ResponseEntity.ok(clienteService.salvar(cliente)); // 200
    }

    @DeleteMapping("/{id}") // DELETE /cliente/1 -> excluir
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        clienteService.excluir(id);
        return ResponseEntity.noContent().build(); // 204
    }

}
