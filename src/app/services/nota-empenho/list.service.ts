import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaEmpenho } from 'src/app/interfaces/NotaEmpenho';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  apiUrl = `${environment.apiURL}/notasEmpenho`

  constructor(private http: HttpClient) { }

  getNotas(): Observable<any>{
    return this.http.get<NotaEmpenho[]>(this.apiUrl + '?size=300')
  }

  cadNota(dados: NotaEmpenho){
    this.http.post<NotaEmpenho>(this.apiUrl, dados).subscribe(erro => {
      if(erro) console.log(erro)
    })
  }

  editNota(dados: NotaEmpenho){
    console.log("Atualizando para: " + dados)
    this.http.put<NotaEmpenho>(this.apiUrl, dados).subscribe(erro => {
      if(erro) console.log(erro)
    })
  }

  deleteNota(dados: NotaEmpenho){
    this.http.delete<NotaEmpenho>(this.apiUrl + '/' + dados.numero).subscribe(erro => {
      if(erro) console.log(erro)
    })
  }
}
