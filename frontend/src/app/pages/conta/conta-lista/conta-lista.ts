import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Conta } from '../../../models/conta.model';
import { ContaService } from '../../../services/conta.service';

@Component({
  selector: 'app-conta-lista',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './conta-lista.html',
  styleUrl: './conta-lista.css',
})
export class ContaLista implements OnInit {
  private contaService = inject(ContaService);

  contas = signal<Conta[]>([]);
  carregando = signal(true);
  erro = signal('');

  // soma dos saldos, recalculada sempre que a lista muda
  saldoTotal = computed(() => this.contas().reduce((total, c) => total + (c.saldo ?? 0), 0));

  ngOnInit(): void {
    this.carregar();
  }

  // GET ALL
  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.contaService.listar().subscribe({
      next: (lista) => {
        this.contas.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar as contas. A API está rodando em localhost:8080?');
        this.carregando.set(false);
      },
    });
  }

  // DELETE
  excluir(conta: Conta): void {
    if (!confirm(`Excluir a conta ${conta.numeroConta} de ${conta.titular}?`)) return;

    this.contaService.excluir(conta.numeroConta!).subscribe({
      next: () => this.contas.update((lista) => lista.filter((c) => c.numeroConta !== conta.numeroConta)),
      error: () => this.erro.set('Erro ao excluir a conta.'),
    });
  }
}
