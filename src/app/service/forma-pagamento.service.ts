import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormaPagamento } from '../model/forma-pagamento';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {



private url = environment.urlApi;

  constructor(private http: HttpClient,
              private route: Router,
              private loginService: LoginService
  ) {
  }

  listarFormaPagamento(){
    console.info(this.loginService.codEmpresa())
    return this.http.get<FormaPagamento[]>(this.url + 'listaFormaPagamento/'+ this.loginService.objetoEmpresa().id)
  }

  excluirFormaPagamento(formaPagamento: FormaPagamento) {

    this.http.post<String>(this.url + 'deletarFormaPagamento', formaPagamento).subscribe({
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

  cadastrarFormaPagamento(formaPagamento: FormaPagamento) {
      return this.http.post<string>(this.url + 'salvarFormaPagamento', formaPagamento).pipe(
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
          alert('Não foi possível cadastrar a formaPagamento: ' + error.message);
          console.info(error);
          return throwError(error);
        })
      );
    }
}
