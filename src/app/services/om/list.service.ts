import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OM } from 'src/app/interfaces/OM';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiURL}/om`

  getOm(): Observable<OM[]> {
    return this.http.get<OM[]>(this.apiUrl + '?ordem=id')
  }

  cadOm(dados: OM) {
    this.http.post<OM>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  editOm(dados: OM) {
    this.http.put<OM>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  deleteOm(dados: OM) {
    this.http.delete<OM>(this.apiUrl + '/delete/' + dados.id).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }
}
