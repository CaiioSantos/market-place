import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CupomDesconto } from 'src/app/model/cupom-desconto';
import { CupomDescontoService } from 'src/app/service/cupom-desconto.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-cupom-desconto',
  templateUrl: './cupom-desconto.component.html',
  styleUrls: ['./cupom-desconto.component.scss']
})
export class CupomDescontoComponent implements OnInit {


    lista = new Array<CupomDesconto>();
    formaPagamento: CupomDesconto;

    cupomDescontoForm = this.form.group({
        id: new FormControl<number | null>(null),
        codDesc: new FormControl<string | null>(null, Validators.required),
        dataValidateCupom: new FormControl<Date | null>(null, Validators.required),
        valorRealDesc: new FormControl<Number | null>(null, Validators.required),
        valorPorcentDesc: new FormControl<Number | null>(null, Validators.required),
        empresa: [this.loginService.objetoEmpresa(), Validators.required]
      });

    constructor(private form: FormBuilder, private service: CupomDescontoService,
         private route: Router, private loginService: LoginService) {
          this.formaPagamento = new CupomDesconto();
         }

    ngOnInit() {

      this.listarCupomDesconto();
    }

    listarCupomDesconto(){

        this.service.listarCupomDesconto().subscribe({
          next: (res) =>{
            this.lista = res
          },
          error: (error) => {
            alert(error)
          }
        })
      }

      editarCupomDesconto(formaPagamento: CupomDesconto): void {
            this.cupomDescontoForm.setValue({
              id: formaPagamento.id ?? null,
              codDesc: formaPagamento.codDesc ?? null,
              dataValidateCupom: formaPagamento.dataValidateCupom ?? null,
              valorRealDesc: formaPagamento.valorRealDesc ?? null,
              valorPorcentDesc: formaPagamento.valorPorcentDesc ?? null,
              empresa: formaPagamento.empresa ?? null
            });
      }

      excluirCupomDesconto(formaPagamento: CupomDesconto): void {
        var confirma  = confirm('deseja mesmo excluir?');

        if (confirma) {
          this.service.excluirCupomDesconto(formaPagamento)
        }
        this.listarCupomDesconto()
      }

      catProdObjeto(): CupomDesconto {
          return{
            id: this.cupomDescontoForm.get('id')?.value!,
            codDesc: this.cupomDescontoForm.get('codDesc')?.value!,
            dataValidateCupom: this.cupomDescontoForm.get('dataValidateCupom')?.value!,
            valorRealDesc: this.cupomDescontoForm.get('valorRealDesc')?.value!,
            valorPorcentDesc: this.cupomDescontoForm.get('valorPorcentDesc')?.value!,
            empresa : this.loginService.objetoEmpresa(),
          }
        }

        cadastrarCupomDesconto() {
          const formaPagamento = this.catProdObjeto();
          this.service.cadastrarCupomDesconto(formaPagamento).subscribe({
            next: () => {
              // Resetar o formulário após cadastrar
              this.limpar();
              // Atualizar a lista de marcas
              this.listarCupomDesconto();
            },
            error: (error) => {
              console.error('Erro ao cadastrar a marca', error);
            }
          });
        }

        limpar() {
          this.cupomDescontoForm.reset();}

}
