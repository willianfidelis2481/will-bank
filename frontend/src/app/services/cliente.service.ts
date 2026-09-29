import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';

// Service = a única parte do front que conversa com a API de clientes.
// Os componentes (telas) chamam estes métodos e não precisam saber de URLs.
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/cliente`;

  // GET ALL -> GET /cliente
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  // GET por id -> GET /cliente/{id} (usado para preencher o formulário de edição)
  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  // POST -> POST /cliente
  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  // PUT -> PUT /cliente/{id}
  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${id}`, cliente);
  }

  // DELETE -> DELETE /cliente/{id}
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
