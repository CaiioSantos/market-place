import { Injectable } from '@angular/core';
import { CategoriaProduto } from '../model/categoria-produto';
import { environment } from '../environment/environment';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {

  private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router
  ) {
  }

  cadastrarPrduto(categoriaProduto: CategoriaProduto) {
    console.info(categoriaProduto)
    return this.http.post<String>(this.url + 'salvarCategoria', categoriaProduto).subscribe({
      next: (response) => {
        alert('Cadastrado com Sucesso')
      },
      error: (error) => {
        console.info(error.error)
        alert('Não foi possivel cadastrar a categoria'+ error )
      }
    })
  }


}
