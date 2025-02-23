import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { catchError, tap, throwError } from 'rxjs';
import { MarcaProduto } from '../model/marca-produto';

@Injectable({
  providedIn: 'root'
})
export class MarcaProdutoService {

  private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  cadastrarPrduto(marcaProduto: MarcaProduto) {
    return this.http.post<string>(this.url + 'salvarMarca', marcaProduto).pipe(
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
        alert('Não foi possível cadastrar a marca: ' + error.message);
        console.info(error);
        return throwError(error);
      })
    );
  }


listarMarca(page: Number){
  console.info(this.loginService.codEmpresa())
  return this.http.get<MarcaProduto[]>(this.url + 'listaPorPageMarcaProduto/'+ this.loginService.objetoEmpresa().id + '/' + page)
}

buscarPorId(id: any){

  return this.http.get<MarcaProduto>(this.url + 'obterMarcaProduto/' +id)
}

excluirCat(marcaProduto: MarcaProduto){

  this.http.post<String>(this.url + 'deleteMarca/', marcaProduto).subscribe({
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
      console.error('Erro ao excluir marca', error);
    }
  })
}

buscarPorDesc(descricao: String){

  return this.http.get<MarcaProduto[]>(this.url + 'buscarPorDescMarca/' + descricao + '/' + this.loginService.objetoEmpresa().id)
}

qtdPaginas(){

  return this.http.get<number>(this.url + 'qtdPaginaMarcaProduto/' + this.loginService.objetoEmpresa().id)
}

}
