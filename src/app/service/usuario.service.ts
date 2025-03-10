import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UserPessoa } from '../model/user-pessoa';
import { catchError, tap, throwError } from 'rxjs';

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
    return this.http.get<UserPessoa[]>(this.url + 'listUserByEmpresa/' + this.loginService.objetoEmpresa().id)
  }

  buscarPorId(id: any){

    return this.http.get<UserPessoa>(this.url + 'userById/' +id)
  }

  cadastrarUsuario(acesso: UserPessoa) {
      return this.http.post<string>(this.url + 'salvarPj', acesso).pipe(
        tap((res) => {
          try {
            var jsonResposta = JSON.parse(JSON.stringify(res));

            if (jsonResposta.error != undefined) {
              alert(jsonResposta.error);
            } else {
              alert('Salvo com sucesso: ID: ' + jsonResposta.id);
            }
          } catch (error) {
            alert('A resposta não é um JSON válido: ' + res);
            console.error('Erro ao parsear resposta:', error);
          }
        }),
        catchError((error) => {
          alert('Não foi possível cadastrar a acesso: ' + error.message);
          console.info(error);
          return throwError(error);
        })
      );
    }

}
