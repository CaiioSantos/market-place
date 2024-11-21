import { HttpClient } from '@angular/common/http';
import { environment } from './../environment/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router
  ) {
  }

  logar(usuario:Usuario){
    return this.http.post<String>(this.url + 'login', usuario).subscribe({
      next:(response) => {
        var respJson = JSON.stringify(response)
        var jwt = JSON.parse(respJson)
        localStorage.setItem('Authorization', jwt.Authorization)
        localStorage.setItem('username', jwt.username)

        this.route.navigateByUrl('home')
      },
      error :(err) => {
          alert('erro')
      },
    });
  }
  getCodEmpresa(){
    return localStorage.getItem('empresa')
  }

  recuperarSenha(login: String) {
    return this.http.post<String>(this.url + 'recuperarSenha', login).subscribe({
      next: (response) => {
        alert(JSON.stringify(response))
      },
      error: (error) => {
        alert('Erro ao recuperar a senha'+ JSON.stringify(error))
      }
    })
  }

  usuarioLogado() {
    var authorization = ''+ localStorage.getItem('Authorization');

    return authorization != '' && authorization !== null && authorization !== 'null';
  }

  deslogarUsuario() {
    localStorage.setItem('Authorization','')
    localStorage.setItem('username','')
    this.route.navigateByUrl('login')

  }
}
