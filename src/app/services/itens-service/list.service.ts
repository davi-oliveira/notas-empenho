import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  apiUrl = "http://192.168.0.58:8080/itens"

  constructor(private http: HttpClient) { }

  getItens(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '?ordem=numero_Item')
  }

  cadItem(dados: Item) {
    this.http.post<Item>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  editItem(dados: Item) {
    this.http.put<Item>(this.apiUrl, dados).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

  deleteItem(dados: Item) {
    this.http.delete<Item>(this.apiUrl + '/delete/' + dados.numero_item).subscribe(erro => {
      if (erro)
        console.log(erro)
    })
  }

}
