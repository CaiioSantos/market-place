import { Component, OnInit } from '@angular/core';
import { AcessoService } from '../service/acesso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Acesso } from '../model/acesso';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss']
})
export class AcessoComponent implements OnInit {



  lista = new Array<Acesso>();
  acesso: Acesso;
  varPesquisa: String = '';
  qtdPagina: number = 0;
  arrayNumber: number []= [];
  paginaAtual: number = 0;

  accessoForm = this.form.group({
    id: new FormControl<number | null>(null),
    descricao: new FormControl<string | null>(null, Validators.required),
  });

  constructor(private form: FormBuilder, private service: AcessoService,
     private route: Router, private loginService: LoginService){
      this.acesso = new Acesso();
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

    this.listarAcesso(this.qtdPagina);
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

  catProdObjeto(): Acesso {
    return{
      id: this.accessoForm.get('id')?.value!,
      descricao: this.accessoForm.get('descricao')?.value!,
      empresa : this.loginService.objetoEmpresa(),
    }
  }

  cadastrarAcesso() {
    const acesso = this.catProdObjeto();
    this.service.cadastrarAcesso(acesso).subscribe({
      next: () => {
        // Resetar o formulário após cadastrar
        this.limpar();
        // Atualizar a lista de marcas
        this.listarAcesso(this.paginaAtual);
        console.log(this.paginaAtual)
      },
      error: (error) => {
        console.error('Erro ao cadastrar a marca', error);
      }
    });
  }


  listarAcesso(page: number){

    this.service.listarAcesso(page).subscribe({
      next: (res) =>{
        this.atualizarPagina();
        this.lista = res
      },
      error: (error) => {

      }
    })
  }

  editarAcesso(produto: Acesso): void {

    this.service.buscarPorId(produto.id).subscribe({
      next:(res) => {
        this.acesso = res;
        this.accessoForm.setValue({
          id: this.acesso.id ?? null,
          descricao: this.acesso.descricao ?? null });
      },
      error(err) {
        console.error('Erro ao buscar produto por ID:', err);
      },
    });

  }

  excluirAcesso(produto: Acesso): void {
    var confirma  = confirm('deseja mesmo excluir?');

    if (confirma) {
      this.service.excluirAcesso(produto)
    }
    this.listarAcesso(this.paginaAtual)
  }

  setPesquisa(val: String) {
    this.varPesquisa = val;

  }

  pesquisar() {

    if (this.varPesquisa.length <= 0) {
      this.listarAcesso(this.paginaAtual);
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
    this.listarAcesso(page);
  }

  voltar() {

    if(this.paginaAtual.valueOf() > 0){
      this.paginaAtual =  this.paginaAtual.valueOf() - 1;
    }
    this.listarAcesso(this.paginaAtual)
  }

  avancar(): void {

    if(this.paginaAtual.valueOf() < 0){
      this.paginaAtual =  this.paginaAtual.valueOf() + 1;
    }
    this.listarAcesso(this.paginaAtual)
  }

  limpar() {
    this.accessoForm.reset();}
}
