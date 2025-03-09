import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  excluirEndereco(endereco: Endereco): void {

    if (endereco.id != null) {
    this.http.post<String>(this.url + 'deleteEndereco/', endereco).subscribe({
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
}
