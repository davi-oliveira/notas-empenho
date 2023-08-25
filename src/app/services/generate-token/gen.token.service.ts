import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenTokenService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url != `${environment.apiURL}/login`) {
      let tokenHeader = req.clone({
        setHeaders: {
          Authorization: "Bearer " + localStorage.getItem('token-empenho')
        }
      })
      return next.handle(tokenHeader)
    }
    else return next.handle(req);
  }
}
