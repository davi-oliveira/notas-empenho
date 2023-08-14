import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilizacao } from 'src/app/interfaces/Utilizacao';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiURL}/utilizacao`

  getNotaOm(): Observable<any> {
    return this.http.get<Utilizacao[]>(this.apiUrl)
  }

  cadNotaOm(dados: Utilizacao) {
    this.http.post<Utilizacao>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  editNotaOm(dados: Utilizacao) {
    this.http.put<Utilizacao>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  deleteNotaOm(dados: Utilizacao) {
    this.http.delete<Utilizacao>(this.apiUrl + '/' + dados.id).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }
}
