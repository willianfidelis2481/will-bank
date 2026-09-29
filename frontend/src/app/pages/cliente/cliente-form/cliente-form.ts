import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

// O mesmo formulário serve para CRIAR (POST) e EDITAR (PUT):
// - rota /clientes/novo          -> sem id -> POST
// - rota /clientes/editar/:id    -> com id -> busca o cliente, preenche o form e faz PUT
@Component({
  selector: 'app-cliente-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clienteService = inject(ClienteService);

  id: number | null = null; // preenchido quando estiver editando
  salvando = signal(false);
  erro = signal('');

  // Formulário reativo com as mesmas regras do back-end (@Column)
  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.maxLength(100)]],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    telefone: ['', [Validators.maxLength(20)]],
  });

  ngOnInit(): void {
    const idDaRota = this.route.snapshot.paramMap.get('id');
    if (idDaRota) {
      this.id = Number(idDaRota);
      this.clienteService.buscarPorId(this.id).subscribe({
        next: (cliente) => this.form.patchValue({ ...cliente, telefone: cliente.telefone ?? '' }),
        error: () => this.erro.set('Cliente não encontrado.'),
      });
    }
  }

  // Mostra erro só depois que o usuário mexeu no campo
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
    const cliente: Cliente = this.form.getRawValue();

    const requisicao = this.id
      ? this.clienteService.atualizar(this.id, cliente) // PUT
      : this.clienteService.criar(cliente); // POST

    requisicao.subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => {
        this.erro.set('Erro ao salvar o cliente. Verifique os dados e se a API está rodando.');
        this.salvando.set(false);
      },
    });
  }
}
