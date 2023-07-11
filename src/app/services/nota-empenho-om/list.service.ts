import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotaOM } from 'src/app/interfaces/NotaOM';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiURL}/notaOM`

  getNotaOm(): Observable<NotaOM[]> {
    return this.http.get<NotaOM[]>(this.apiUrl)
  }

  cadNotaOm(dados: NotaOM) {
    this.http.post<NotaOM>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  editNotaOm(dados: NotaOM) {
    this.http.put<NotaOM>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  deleteNotaOm(dados: NotaOM) {
    this.http.delete<NotaOM>(this.apiUrl + '/delete/' + dados.id).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }
}
