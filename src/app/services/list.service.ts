import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../interfaces/Contrato';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  apiUrl = "http://10.133.1.41:8080/contratos"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contrato[]>{
    return this.http.get<Contrato[]>(this.apiUrl)
  }

  cadContrato(dados: Contrato){
    this.http.post<Contrato>(this.apiUrl, dados).subscribe(erro => { 
      if(erro)
        console.log(erro)
    })
  }
}
