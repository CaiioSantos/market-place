import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CupomDesconto } from '../model/cupom-desconto';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CupomDescontoService {

  private url = environment.urlApi;

    constructor(private http: HttpClient,
                private route: Router,
                private loginService: LoginService
    ) {
    }

    listarCupomDesconto(){
      console.info(this.loginService.codEmpresa())
      return this.http.get<CupomDesconto[]>(this.url + 'listaCupomDesc/'+ this.loginService.objetoEmpresa().id)
    }

    excluirCupomDesconto(cupomDesconto: CupomDesconto) {

      this.http.post<String>(this.url + 'deletarCupDes', cupomDesconto).subscribe({
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

    cadastrarCupomDesconto(cupomDesconto: CupomDesconto) {
        return this.http.post<string>(this.url + 'salvarCupDesc', cupomDesconto).pipe(
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
            alert('Não foi possível cadastrar a cupomDesconto: ' + error.message);
            console.info(error);
            return throwError(error);
          })
        );
      }
}
