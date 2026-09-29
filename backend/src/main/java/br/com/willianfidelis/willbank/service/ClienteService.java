package br.com.willianfidelis.willbank.service;

import br.com.willianfidelis.willbank.entity.Cliente; // Cliente está no pacote entity
import br.com.willianfidelis.willbank.repository.ClienteRepository; // ClienteRepository está no pacote repository
import org.springframework.beans.factory.annotation.Autowired; // pede ao Spring um objeto já pronto pra usar
import org.springframework.stereotype.Service; // marca a classe como camada de serviço
import java.util.List; // tipo usado para representar uma lista de clientes
import java.util.Optional; // tipo usado quando o resultado pode existir ou não

@Service // avisa ao Spring: "gerencie essa classe como um serviço"

public class ClienteService {

    @Autowired // "me entregue um ClienteRepository pronto, não preciso criar na mão"
    private ClienteRepository clienteRepository;

    public Cliente salvar(Cliente cliente) {
        return clienteRepository.save(cliente); // gera INSERT ou UPDATE sozinho
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll(); // gera SELECT * FROM cliente
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id); // "achei" ou "vazio", nunca null
    }

    public void excluir(Long id) {
        clienteRepository.deleteById(id);
    }

}
