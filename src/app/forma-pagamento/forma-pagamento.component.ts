import { FormaPagamento } from './../model/forma-pagamento';
import { Component, OnInit } from '@angular/core';
import { FormaPagamentoService } from '../service/forma-pagamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {



  lista = new Array<FormaPagamento>();
  formaPagamento: FormaPagamento;

  formaPagamentoForm = this.form.group({
      id: new FormControl<number | null>(null),
      descricao: new FormControl<string | null>(null, Validators.required),
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });

  constructor(private form: FormBuilder, private service: FormaPagamentoService,
       private route: Router, private loginService: LoginService) {
        this.formaPagamento = new FormaPagamento();
       }

  ngOnInit() {

    this.listarFormaPagamento();
  }

  listarFormaPagamento(){

      this.service.listarFormaPagamento().subscribe({
        next: (res) =>{
          this.lista = res
        },
        error: (error) => {
          alert(error)
        }
      })
    }

    editarFormaPagamento(formaPagamento: FormaPagamento): void {
          this.formaPagamentoForm.setValue({
            id: formaPagamento.id ?? null,
            descricao: formaPagamento.descricao ?? null,
            empresa: formaPagamento.empresa ?? null
          });
    }

    excluirFormaPagamento(formaPagamento: FormaPagamento): void {
      var confirma  = confirm('deseja mesmo excluir?');

      if (confirma) {
        this.service.excluirFormaPagamento(formaPagamento)
      }
      this.listarFormaPagamento()
    }

    catProdObjeto(): FormaPagamento {
        return{
          id: this.formaPagamentoForm.get('id')?.value!,
          descricao: this.formaPagamentoForm.get('descricao')?.value!,
          empresa : this.loginService.objetoEmpresa(),
        }
      }

      cadastrarFormaPagamento() {
        const formaPagamento = this.catProdObjeto();
        this.service.cadastrarFormaPagamento(formaPagamento).subscribe({
          next: () => {
            // Resetar o formulário após cadastrar
            this.limpar();
            // Atualizar a lista de marcas
            this.listarFormaPagamento();
          },
          error: (error) => {
            console.error('Erro ao cadastrar a marca', error);
          }
        });
      }

      limpar() {
        this.formaPagamentoForm.reset();}

}
