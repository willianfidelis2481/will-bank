import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conta } from '../models/conta.model';
import { environment } from '../../environments/environment';

// Service = a única parte do front que conversa com a API de contas.
@Injectable({ providedIn: 'root' })
export class ContaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/conta`;

  // GET ALL -> GET /conta
  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.url);
  }

  // GET por número -> GET /conta/{numeroConta}
  buscarPorId(numeroConta: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.url}/${numeroConta}`);
  }

  // POST -> POST /conta
  criar(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.url, conta);
  }

  // PUT -> PUT /conta/{numeroConta}
  atualizar(numeroConta: number, conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${this.url}/${numeroConta}`, conta);
  }

  // DELETE -> DELETE /conta/{numeroConta}
  excluir(numeroConta: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${numeroConta}`);
  }
}
