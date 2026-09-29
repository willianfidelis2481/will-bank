import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-lista',
  imports: [RouterLink],
  templateUrl: './cliente-lista.html',
  styleUrl: './cliente-lista.css',
})
export class ClienteLista implements OnInit {
  private clienteService = inject(ClienteService);

  // signals: quando o valor muda, a tela atualiza sozinha
  clientes = signal<Cliente[]>([]);
  carregando = signal(true);
  erro = signal('');

  ngOnInit(): void {
    this.carregar();
  }

  // GET ALL
  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.clienteService.listar().subscribe({
      next: (lista) => {
        this.clientes.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os clientes. A API está rodando em localhost:8080?');
        this.carregando.set(false);
      },
    });
  }

  // DELETE
  excluir(cliente: Cliente): void {
    if (!confirm(`Excluir o cliente "${cliente.nome}"?`)) return;

    this.clienteService.excluir(cliente.id!).subscribe({
      next: () => this.clientes.update((lista) => lista.filter((c) => c.id !== cliente.id)),
      error: () => this.erro.set('Erro ao excluir o cliente.'),
    });
  }

  // 12345678901 -> 123.456.789-01 (só para exibir)
  formatarCpf(cpf: string): string {
    return cpf?.length === 11 ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : cpf;
  }
}
