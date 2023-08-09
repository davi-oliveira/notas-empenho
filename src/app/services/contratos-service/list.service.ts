import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../../interfaces/Contrato';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiURL}/contratos`

  getCtn(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '?ordem=numero_contrato')
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
