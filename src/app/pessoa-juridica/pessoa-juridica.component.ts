import { Component, OnInit } from '@angular/core';
import { PessoaJuridica } from '../model/pessoa-juridica';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PessoaJuridicaService } from '../service/pessoa-juridica.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-juridica',
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.scss']
})
export class PessoaJuridicaComponent implements OnInit {
testeform() {
console.info(this.pessoaJuridicaForm)
}

  lista = new Array<PessoaJuridica>();
    pessoaJuridica: PessoaJuridica;
    varPesquisa: String = '';
    qtdPagina: number = 0;
    arrayNumber: number []= [];
    paginaAtual: number = 0;
    categorias: string [] = [];

    pessoaJuridicaForm = this.form.group({
        id: new FormControl<number | null>(null),
        cnpj: new FormControl<string | null>(null),
        inscEstadual: new FormControl<string | null>(null, Validators.required),
        inscMunicipal: new FormControl<string | null>(null, Validators.required),
        nomeFantasia: new FormControl<string | null>(null, Validators.required),
        razaoSocial: new FormControl<string | null>(null, Validators.required),
        categoria: new FormControl<string | null>("", Validators.required),
        nome: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null, Validators.email),
        telefone: new FormControl<string | null>(null),
        tipoPessoa: new FormControl<string | null>(""),
        empresa: [this.loginService.objetoEmpresa(), Validators.required]

      });

constructor(private form: FormBuilder, private service: PessoaJuridicaService,
     private route: Router, private loginService: LoginService){
      this.pessoaJuridica = new PessoaJuridica();
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

    this.listarPessoaJuridica(this.qtdPagina);
  }

  listarPessoaJuridica(page: number){

    this.service.listarPessoaJuridica(page).subscribe({
      next: (res) =>{
        this.atualizarPagina();
        this.lista = res
      },
      error: (error) => {

      }
    })
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
    const pessoaJuridica = this.catProdObjeto();
    this.service.cadastrarPessoaJuridica(pessoaJuridica).subscribe({
      next: () => {
        // Resetar o formulário após cadastrar
        this.limpar();
        // Atualizar a lista de marcas
        this.listarPessoaJuridica(this.paginaAtual);
        console.log(this.paginaAtual)
      },
      error: (error) => {
        console.error('Erro ao cadastrar a marca', error);
      }
    });
  }

    catProdObjeto(): PessoaJuridica {
        return{
          id: this.pessoaJuridicaForm.get('id')?.value!,
          cnpj: this.pessoaJuridicaForm.get('cnpj')?.value!,
          inscEstadual: this.pessoaJuridicaForm.get('inscEstadual')?.value!,
          inscMunicipal: this.pessoaJuridicaForm.get('inscMunicipal')?.value!,
          nomeFantasia : this.pessoaJuridicaForm.get('nomeFantasia')?.value!,
          razaoSocial: this.pessoaJuridicaForm.get('razaoSocial')?.value!,
          categoria: this.pessoaJuridicaForm.get('categoria')?.value!,
          nome : this.pessoaJuridicaForm.get('nome')?.value!,
          email: this.pessoaJuridicaForm.get('email')?.value!,
          telefone: this.pessoaJuridicaForm.get('telefone')?.value!,
          tipoPessoa: this.pessoaJuridicaForm.get('tipoPessoa')?.value!,
          empresa : this.pessoaJuridicaForm.get('empresa')?.value!,
        }
      }

      limpar() {
        this.pessoaJuridicaForm.reset();
      }

   editarAcesso(pessoaJuridica: PessoaJuridica): void {

      this.service.buscarPorId(pessoaJuridica.id).subscribe({
        next:(res) => {
          this.pessoaJuridica = res;
          this.pessoaJuridicaForm.setValue({
            id: this.pessoaJuridica.id ?? null,
            cnpj: this.pessoaJuridica.cnpj ?? null,
            inscEstadual: this.pessoaJuridica.inscEstadual ?? null,
            inscMunicipal: this.pessoaJuridica.inscMunicipal ?? null,
            nomeFantasia: this.pessoaJuridica.nomeFantasia ?? null,
            razaoSocial: this.pessoaJuridica.razaoSocial ?? null,
            categoria: this.pessoaJuridica.categoria ?? null,
            nome: this.pessoaJuridica.nome ?? null,
            email: this.pessoaJuridica.email ?? null,
            telefone: this.pessoaJuridica.telefone ?? null,
            tipoPessoa: this.pessoaJuridica.tipoPessoa ?? null,
            empresa: this.pessoaJuridica.empresa ?? null

          });
        },
        error(err) {
          console.error('Erro ao buscar produto por ID:', err);
        },
      });

    }

    excluirAcesso(pessoaJuridica: PessoaJuridica): void {
      var confirma  = confirm('deseja mesmo excluir?');

      if (confirma) {
        this.service.excluirPessoaJuridica(pessoaJuridica)
      }
      this.listarPessoaJuridica(this.paginaAtual)
    }

    setPesquisa(val: String) {
      this.varPesquisa = val;

    }

    pesquisar() {

      if (this.varPesquisa.length <= 0) {
        this.listarPessoaJuridica(this.paginaAtual);
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
      this.listarPessoaJuridica(page);
    }

    voltar() {

      if(this.paginaAtual.valueOf() > 0){
        this.paginaAtual =  this.paginaAtual.valueOf() - 1;
      }
      this.listarPessoaJuridica(this.paginaAtual)
    }

    avancar(): void {

      if(this.paginaAtual.valueOf() < 0){
        this.paginaAtual =  this.paginaAtual.valueOf() + 1;
      }
      this.listarPessoaJuridica(this.paginaAtual)
    }

}
