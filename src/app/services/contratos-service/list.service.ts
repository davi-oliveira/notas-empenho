import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../../interfaces/Contrato';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  apiUrl = `${environment.apiURL}/contratos`

  constructor(private http: HttpClient) { }

  getCtn(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.apiUrl + '?ordem=numero_contrato')
  }

  cadContrato(dados: Contrato) {
    this.http.post<Contrato>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  editContrato(dados: Contrato) {
    this.http.put<Contrato>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  deleteCont(dados: Contrato) {
    this.http.delete<Contrato>(this.apiUrl + '/delete/' + dados.numero_contrato).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }
}