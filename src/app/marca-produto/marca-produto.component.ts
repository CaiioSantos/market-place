import { Component, OnInit } from '@angular/core';
import { MarcaProdutoService } from '../service/marca-produto.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MarcaProduto } from '../model/marca-produto';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-marca-produto',
  templateUrl: './marca-produto.component.html',
  styleUrls: ['./marca-produto.component.scss']
})
export class MarcaProdutoComponent implements OnInit {



  lista = new Array<MarcaProduto>();
  catProduto: MarcaProduto;
  varPesquisa: String = '';
  qtdPagina: number = 0;
  arrayNumber: number []= [];
  paginaAtual: number = 0;

  marForm = this.form.group({
    id: new FormControl<number | null>(null),
    descricao: new FormControl<string | null>(null, Validators.required),
  });

  constructor(private form: FormBuilder, private service: MarcaProdutoService,
     private route: Router, private loginService: LoginService){
      this.catProduto = new MarcaProduto();
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

    this.listarMarca(this.qtdPagina);
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

  catProdObjeto(): MarcaProduto {
    return{
      id: this.marForm.get('id')?.value!,
      nomeDesc: this.marForm.get('descricao')?.value!,
      empresa : this.loginService.objetoEmpresa(),
    }
  }

  cadProdutoMarca() {
    const marcaProduto = this.catProdObjeto();
    this.service.cadastrarPrduto(marcaProduto).subscribe({
      next: () => {
        // Resetar o formulário após cadastrar
        this.limpar();
        // Atualizar a lista de marcas
        this.listarMarca(this.paginaAtual);
        console.log(this.paginaAtual)
      },
      error: (error) => {
        console.error('Erro ao cadastrar a marca', error);
      }
    });
  }


  listarMarca(page: number){

    this.service.listarMarca(page).subscribe({
      next: (res) =>{
        this.atualizarPagina();
        this.lista = res
      },
      error: (error) => {

      }
    })
  }

  editarProduto(produto: MarcaProduto): void {

    this.service.buscarPorId(produto.id).subscribe({
      next:(res) => {
        this.catProduto = res;
        this.marForm.setValue({
          id: this.catProduto.id ?? null,
          descricao: this.catProduto.nomeDesc ?? null });
      },
      error(err) {
        console.error('Erro ao buscar produto por ID:', err);
      },
    });

  }

  excluirCatProduto(produto: MarcaProduto): void {
    var confirma  = confirm('deseja mesmo excluir?');

    if (confirma) {
      this.service.excluirCat(produto)
    }
    this.listarMarca(this.paginaAtual)
  }

  setPesquisa(val: String) {
    this.varPesquisa = val;

  }

  pesquisar() {

    if (this.varPesquisa.length <= 0) {
      this.listarMarca(this.paginaAtual);
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
    this.listarMarca(page);
  }

  voltar() {

    if(this.paginaAtual.valueOf() > 0){
      this.paginaAtual =  this.paginaAtual.valueOf() - 1;
    }
    this.listarMarca(this.paginaAtual)
  }

  avancar(): void {

    if(this.paginaAtual.valueOf() < 0){
      this.paginaAtual =  this.paginaAtual.valueOf() + 1;
    }
    this.listarMarca(this.paginaAtual)
  }

  limpar() {
    this.marForm.reset();}
}
