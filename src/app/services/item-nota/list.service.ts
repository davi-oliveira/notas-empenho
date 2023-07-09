import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaEmpenho } from 'src/app/interfaces/NotaEmpenho';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  constructor() { }

  apiUrl = `${environment.apiURL}/itemNotaEmpenho`
}
