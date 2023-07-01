import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../interfaces/Contrato';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  apiUrl = "http://192.168.0.58:8080/contratos"

  constructor(private http: HttpClient) { }

  getCtn(): Observable<Contrato[]>{
    return this.http.get<Contrato[]>(this.apiUrl + '?ordem=numero_contrato')
  }

  cadContrato(dados: Contrato){
    this.http.post<Contrato>(this.apiUrl, dados).subscribe(erro => { 
      if(erro)
        console.log(erro)
    })
  }

  editContrato(dados: Contrato){
    this.http.put<Contrato>(this.apiUrl, dados).subscribe(erro => { 
      if(erro)
        console.log(erro)
    })
  }
}
