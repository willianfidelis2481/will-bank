import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Conta } from '../../../models/conta.model';
import { ContaService } from '../../../services/conta.service';

// O mesmo formulário serve para CRIAR (POST) e EDITAR (PUT):
// - rota /contas/novo          -> POST
// - rota /contas/editar/:id    -> busca a conta, preenche o form e faz PUT
@Component({
  selector: 'app-conta-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './conta-form.html',
  styleUrl: './conta-form.css',
})
export class ContaForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contaService = inject(ContaService);

  numeroConta: number | null = null; // preenchido quando estiver editando
  salvando = signal(false);
  erro = signal('');

  // Formulário reativo com as mesmas regras do back-end (@Column)
  form = this.fb.group({
    numeroAgencia: [null as number | null, [Validators.required, Validators.min(1)]],
    titular: ['', [Validators.required, Validators.maxLength(50)]],
    saldo: [0 as number | null, [Validators.required]],
  });

  ngOnInit(): void {
    const idDaRota = this.route.snapshot.paramMap.get('id');
    if (idDaRota) {
      this.numeroConta = Number(idDaRota);
      this.contaService.buscarPorId(this.numeroConta).subscribe({
        next: (conta) => this.form.patchValue(conta),
        error: () => this.erro.set('Conta não encontrada.'),
      });
    }
  }

  invalido(campo: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    this.erro.set('');
    const conta = this.form.getRawValue() as Conta;

    const requisicao = this.numeroConta
      ? this.contaService.atualizar(this.numeroConta, conta) // PUT
      : this.contaService.criar(conta); // POST

    requisicao.subscribe({
      next: () => this.router.navigate(['/contas']),
      error: () => {
        this.erro.set('Erro ao salvar a conta. Verifique os dados e se a API está rodando.');
        this.salvando.set(false);
      },
    });
  }
}
