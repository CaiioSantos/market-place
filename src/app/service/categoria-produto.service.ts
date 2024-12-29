import { Injectable } from '@angular/core';
import { CategoriaProduto } from '../model/categoria-produto';
import { environment } from '../environment/environment';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {

  private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  cadastrarPrduto(categoriaProduto: CategoriaProduto) {
    return this.http.post<string>(this.url + 'salvarCategoria', categoriaProduto).pipe(
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
        alert('Não foi possível cadastrar a categoria: ' + error.message);
        console.info(error);
        return throwError(error);
      })
    );
  }


listarCategoria(){

  return this.http.get<CategoriaProduto[]>(this.url + 'listarCategoriaProduto/'+ this.loginService.objetoEmpresa().id)
}

buscarPorId(id: any){

  return this.http.get<CategoriaProduto>(this.url + 'buscarPorId/' +id)
}

excluirCat(categoriaProduto: CategoriaProduto){

  this.http.post<String>(this.url + 'deleteCategoria/', categoriaProduto).subscribe({
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
      console.error('Erro ao excluir categoria', error);
    }
  })
}

}
