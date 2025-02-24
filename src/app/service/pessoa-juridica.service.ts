import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { catchError, tap, throwError } from 'rxjs';
import { PessoaJuridica } from '../model/pessoa-juridica';


@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {

  private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  cadastrarPessoaJuridica(acesso: PessoaJuridica) {
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


listarPessoaJuridica(page: Number){
  console.info(this.loginService.codEmpresa())
  return this.http.get<PessoaJuridica[]>(this.url + 'listaPorPagePj/'+ this.loginService.objetoEmpresa().id + '/' + page)
}

buscarPorId(id: any){

  return this.http.get<PessoaJuridica>(this.url + 'buscarPjId/' +id)
}

excluirPessoaJuridica(acesso: PessoaJuridica){

  this.http.post<String>(this.url + 'deletePessoaJuridica/', acesso).subscribe({
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

  return this.http.get<PessoaJuridica[]>(this.url + 'buscarPorNomePj/' + descricao + '/' + this.loginService.objetoEmpresa().id)
}

qtdPaginas(){

  return this.http.get<number>(this.url + 'qtdPaginaPj/' + this.loginService.objetoEmpresa().id)
}

}
