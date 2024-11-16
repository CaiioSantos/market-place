import { HttpClient } from '@angular/common/http';
import { environment } from './../environment/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.urlApi;

  constructor(private http: HttpClient) {
  }

  logar(usuario:Usuario){
    return this.http.post<String>(this.url + 'login', usuario).subscribe({
      next:(response) => {
        var respJson = JSON.stringify(response)
        var jwt = JSON.parse(respJson)
        console.info(jwt.Authorization)
        localStorage.setItem('Authorization', jwt.Authorization)
        alert('Login realizado')
      },
      error :(err) => {
          alert('erro')
      },
    });
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
}
