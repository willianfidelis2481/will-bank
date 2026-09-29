import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { ClienteLista } from './pages/cliente/cliente-lista/cliente-lista';
import { ClienteForm } from './pages/cliente/cliente-form/cliente-form';
import { ContaLista } from './pages/conta/conta-lista/conta-lista';
import { ContaForm } from './pages/conta/conta-form/conta-form';

export const routes: Routes = [
  { path: '', component: Home, title: 'Will Bank' },

  // Clientes
  { path: 'clientes', component: ClienteLista, title: 'Clientes | Will Bank' },           // GET ALL + DELETE
  { path: 'clientes/novo', component: ClienteForm, title: 'Novo cliente | Will Bank' },   // POST
  { path: 'clientes/editar/:id', component: ClienteForm, title: 'Editar cliente | Will Bank' }, // PUT

  // Contas
  { path: 'contas', component: ContaLista, title: 'Contas | Will Bank' },
  { path: 'contas/novo', component: ContaForm, title: 'Nova conta | Will Bank' },
  { path: 'contas/editar/:id', component: ContaForm, title: 'Editar conta | Will Bank' },

  // Qualquer outra URL volta para a home
  { path: '**', redirectTo: '' },
];
