import { HttpHeaders } from "@angular/common/http";

export const environment = {
  apiURL: "http://localhost:8080",

  header: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token-empenho')
 })
};