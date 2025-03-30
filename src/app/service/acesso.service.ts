import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { catchError, tap, throwError } from 'rxjs';
import { Acesso } from '../model/acesso';


@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  cadastrarAcesso(acesso: Acesso) {
    return this.http.post<string>(this.url + 'salvarAcesso', acesso).pipe(
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


listarAcesso(page: Number){
  console.info(this.loginService.codEmpresa())
  return this.http.get<Acesso[]>(this.url + 'listaPorPageAcesso/'+ this.loginService.objetoEmpresa().id + '/' + page)
}

listarAcessoTodos(){
  console.info(this.loginService.codEmpresa())
  return this.http.get<Acesso[]>(this.url + 'listaAcessoPorEmpresa/'+ this.loginService.objetoEmpresa().id)
}

buscarPorId(id: any){

  return this.http.get<Acesso>(this.url + 'obterAcesso/' +id)
}

excluirAcesso(acesso: Acesso){

  this.http.post<String>(this.url + 'deleteAcesso/', acesso).subscribe({
    next:(res) => {
      var resResposta = JSON.stringify(res);
      var jsonResposta = JSON.parse(resResposta);
      if (jsonResposta.error != undefined) {
        alert(jsonResposta.error)
      } else {
        alert(jsonResposta)
      }

    },
    error:(error) =>{
      console.error('Erro ao excluir acesso', error);
    }
  })
}

buscarPorDesc(descricao: String){

  return this.http.get<Acesso[]>(this.url + 'buscarPorAcesso/' + descricao + '/' + this.loginService.objetoEmpresa().id)
}

qtdPaginas(){

  return this.http.get<number>(this.url + 'qtdPaginaAcesso/' + this.loginService.objetoEmpresa().id)
}

}
