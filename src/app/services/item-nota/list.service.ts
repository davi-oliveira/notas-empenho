import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaEmpenho } from 'src/app/interfaces/NotaEmpenho';
import { environment } from 'src/environments/environment';
import { ItemNota } from 'src/app/interfaces/ItemNota';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiURL}/itemNota`

  getItensNota(): Observable<any> {
    return this.http.get<ItemNota[]>(this.apiUrl)
  }

  cadItemNota(dados: ItemNota) {
    this.http.post<ItemNota>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  editItemNota(dados: ItemNota) {
    this.http.put<ItemNota>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  deleteItemNota(dados: ItemNota) {
    this.http.delete<ItemNota>(this.apiUrl + '/delete/' + dados.id).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }
}
