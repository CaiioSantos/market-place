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
    return this.http.post<String>(this.url + 'salvarCategoria', categoriaProduto).subscribe({
        next: (res) => {
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
        },
        error: (error) => {
            alert('Não foi possível cadastrar a categoria: ' + error.message);
            console.info(error);
        }
    });
}

listarCategoria(){
  return this.http.get<CategoriaProduto[]>(this.url + 'listarCategoriaProduto')
}

}
