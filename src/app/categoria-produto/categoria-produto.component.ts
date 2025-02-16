import { Component, OnInit } from '@angular/core';
import { CategoriaProdutoService } from '../service/categoria-produto.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoriaProduto } from '../model/categoria-produto';
import { PessoaJuridica } from '../model/pessoa-juridica';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.scss']
})
export class CategoriaProdutoComponent implements OnInit {



  lista = new Array<CategoriaProduto>();
  catProduto: CategoriaProduto;
  varPesquisa: String = '';
  qtdPagina: number = 0;
  arrayNumber: number []= [];
  paginaAtual: number = 1;

  catForm = this.form.group({
    id: new FormControl<number | null>(null),
    descricao: new FormControl<string | null>(null, Validators.required),
  });

  constructor(private form: FormBuilder, private service: CategoriaProdutoService,
     private route: Router, private loginService: LoginService){
      this.catProduto = new CategoriaProduto();
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
    this.listarCategoria(this.paginaAtual);

  }

  catProdObjeto(): CategoriaProduto {
    return{
      id: this.catForm.get('id')?.value!,
      nomeDesc: this.catForm.get('descricao')?.value!,
      empresa : this.loginService.objetoEmpresa(),
    }
  }

  cadProdutoCategoria() {
    const categoriaProduto = this.catProdObjeto();
    this.service.cadastrarPrduto(categoriaProduto).subscribe({
      next: () => {
        // Resetar o formulário após cadastrar
        this.catForm.reset();
        // Atualizar a lista de categorias
        this.listarCategoria(this.paginaAtual);
      },
      error: (error) => {
        console.error('Erro ao cadastrar a categoria', error);
      }
    });
  }


  listarCategoria(page: number){

    this.service.listarCategoria(page).subscribe({
      next: (res) =>{
        this.lista = res
      },
      error: (error) => {

      }
    })
  }

  editarProduto(produto: CategoriaProduto): void {

    this.service.buscarPorId(produto.id).subscribe({
      next:(res) => {
        this.catProduto = res;
        this.catForm.setValue({
          id: this.catProduto.id ?? null,
          descricao: this.catProduto.nomeDesc ?? null });
      },
      error(err) {
        console.error('Erro ao buscar produto por ID:', err);
      },
    });

  }

  excluirCatProduto(produto: CategoriaProduto): void {
    var confirma  = confirm('deseja mesmo excluir?');

    if (confirma) {
      this.service.excluirCat(produto)
    }
    this.listarCategoria(this.paginaAtual)
  }

  setPesquisa(val: String) {
    this.varPesquisa = val;

  }

  pesquisar() {

    if (this.varPesquisa.length <= 0) {
      this.listarCategoria(this.paginaAtual);
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
    this.listarCategoria(page);
  }

  voltar() {

    if(this.paginaAtual.valueOf() > 0){
      this.paginaAtual =  this.paginaAtual.valueOf() - 1;
    }
    this.listarCategoria(this.paginaAtual)
  }

  avancar(): void {

    if(this.paginaAtual.valueOf() < 0){
      this.paginaAtual =  this.paginaAtual.valueOf() + 1;
    }
    this.listarCategoria(this.paginaAtual)
  }
}
