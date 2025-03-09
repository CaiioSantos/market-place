import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  listarUsuarioPorEmpresa(){
    return this.http.get<Usuario[]>(this.url + 'listUserByEmpresa/' + this.loginService.objetoEmpresa().id)
  }

}
