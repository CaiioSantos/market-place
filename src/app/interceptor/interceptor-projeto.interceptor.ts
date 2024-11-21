import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorProjetoInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    var autorization = ''+ localStorage.getItem('Authorization');

    if(autorization !== '' && autorization !== null && autorization !== 'null'){
      const autRequest = request.clone({
        headers: request.headers.set('Authorization', autorization)
      })
      return next.handle(autRequest);

    }else {
      return next.handle(request);

    }
  }
}
