import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Militar } from 'src/app/interfaces/Militar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiURL}/militares`


  getMilitares(){
    return this.http.get<Militar[]>(this.apiUrl + '?ordem=antiguidade')
  }
}
