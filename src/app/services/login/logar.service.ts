import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conta } from 'src/app/interfaces/Conta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogarService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiURL}/login`

  logar(conta: Conta): Observable<any> {
    return this.http.post<Conta>(this.apiUrl, conta);

  }
}
