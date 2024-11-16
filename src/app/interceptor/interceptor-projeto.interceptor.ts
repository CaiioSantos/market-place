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


    var authorization = ''+ localStorage.getItem('Authorization')
    if(authorization != ''){
      console.info(authorization)
      const autRequest = request.clone({
        headers: request.headers.set('Authorization', authorization)
      })
      return next.handle(request);

    }else {
      return next.handle(request);

    }
  }
}
