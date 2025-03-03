import { Component, OnInit } from '@angular/core';
import { PessoaFisica } from '../model/pessoa-fisica';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PessoaFisicaService } from '../service/pessoa-fisica.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.scss']
})
export class PessoaFisicaComponent implements OnInit {


    lista = new Array<PessoaFisica>();
      pessoaFisica: PessoaFisica;
      varPesquisa: String = '';
      qtdPagina: number = 0;
      arrayNumber: number []= [];
      paginaAtual: number = 0;
      categorias: string [] = [];

      pessoafisicaForm = this.form.group({
          id: new FormControl<number | null>(null),
          cpf: new FormControl<string | null>(null),
          dataNascimento: new FormControl<string | null>(null),
          nome: new FormControl<string | null>(null),
          email: new FormControl<string | null>(null, Validators.email),
          telefone: new FormControl<string | null>(null),
          tipoPessoa: new FormControl<string | null>(""),
          empresa: [this.loginService.objetoEmpresa(), Validators.required]

        });

  constructor(private form: FormBuilder, private service: PessoaFisicaService,
       private route: Router, private loginService: LoginService){
        this.pessoaFisica = new PessoaFisica();
    }

    ngOnInit(): void {
      this.service.qtdPaginas().subscribe({
        next: (value) => {
          this.qtdPagina = value;
          this.arrayNumber = Array.from({ length: this.qtdPagina }, (_, i) => i);
        },
        error: (err) => {

        },
      });

      this.listarPessoaFisica(this.qtdPagina);
    }

    listarPessoaFisica(page: number){

      this.service.listarPessoaFisica(page).subscribe({
        next: (res) =>{
          this.atualizarPagina();
          this.lista = res
        },
        error: (error) => {

        }
      })
    }
    testeform() {
      console.info(this.pessoafisicaForm)
      }

    atualizarPagina(): void {
      this.service.qtdPaginas().subscribe({
        next: (value) => {
          this.qtdPagina = Number(value);
          this.arrayNumber = Array.from({ length: this.qtdPagina }, (_, i) => i);
        },
        error: (err) => {

        },
      });

    }

    cadastrarAcesso() {
      const pessoaFisica = this.catProdObjeto();
      this.service.cadastrarPessoaFisica(pessoaFisica).subscribe({
        next: () => {
          // Resetar o formulário após cadastrar
          this.limpar();
          // Atualizar a lista de marcas
          this.listarPessoaFisica(this.paginaAtual);
          console.log(this.paginaAtual)
        },
        error: (error) => {
          console.error('Erro ao cadastrar a marca', error);
        }
      });
    }

      catProdObjeto(): PessoaFisica {
          return{
            id: this.pessoafisicaForm.get('id')?.value!,
            cpf: this.pessoafisicaForm.get('cpf')?.value!,
            nome : this.pessoafisicaForm.get('nome')?.value!,
            dataNascimento: this.pessoafisicaForm.get('dataNascimento')?.value!,
            email: this.pessoafisicaForm.get('email')?.value!,
            telefone: this.pessoafisicaForm.get('telefone')?.value!,
            tipoPessoa: this.pessoafisicaForm.get('tipoPessoa')?.value!,
            empresa : this.pessoafisicaForm.get('empresa')?.value!,
          }
        }

        limpar() {
          this.pessoafisicaForm.reset();
        }

     editarAcesso(pessoaFisica: PessoaFisica): void {

        this.service.buscarPorId(pessoaFisica.id).subscribe({
          next:(res) => {
            this.pessoaFisica = res;
            this.pessoafisicaForm.setValue({
              id: this.pessoaFisica.id ?? null,
              cpf: this.pessoaFisica.cpf ?? null,
              nome: this.pessoaFisica.nome ?? null,
              dataNascimento: this.pessoaFisica.dataNascimento ?? null,
              email: this.pessoaFisica.email ?? null,
              telefone: this.pessoaFisica.telefone ?? null,
              tipoPessoa: this.pessoaFisica.tipoPessoa ?? null,
              empresa: this.pessoaFisica.empresa ?? null
            });
            console.log(this.pessoafisicaForm)
          },
          error(err) {
            console.error('Erro ao buscar produto por ID:', err);
          },
        });

      }

      excluirAcesso(pessoaFisica: PessoaFisica): void {
        var confirma  = confirm('deseja mesmo excluir?');

        if (confirma) {
          this.service.excluirPessoaFisica(pessoaFisica)
        }
        this.listarPessoaFisica(this.paginaAtual)
      }

      setPesquisa(val: String) {
        this.varPesquisa = val;

      }

      pesquisar() {

        if (this.varPesquisa.length <= 0) {
          this.listarPessoaFisica(this.paginaAtual);
          return;
        }

        this.service.buscarPorDesc(this.varPesquisa).subscribe({

          next: (res) => {
            this.lista = res

          },
          error: (erro) => {
            alert(erro)
          }
        })
      }

      buscarPagina(page: number) {
        this.listarPessoaFisica(page);
      }

      voltar() {

        if(this.paginaAtual.valueOf() > 0){
          this.paginaAtual =  this.paginaAtual.valueOf() - 1;
        }
        this.listarPessoaFisica(this.paginaAtual)
      }

      avancar(): void {

        if(this.paginaAtual.valueOf() < 0){
          this.paginaAtual =  this.paginaAtual.valueOf() + 1;
        }
        this.listarPessoaFisica(this.paginaAtual)
      }

}
