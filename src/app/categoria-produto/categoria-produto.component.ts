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

  catForm = this.form.group({
    id: new FormControl<number | null>(null),
    descricao: new FormControl<string | null>(null, Validators.required),
  });

  constructor(private form: FormBuilder, private service: CategoriaProdutoService,
     private route: Router, private loginService: LoginService){
      this.catProduto = new CategoriaProduto();
  }

  ngOnInit(): void {
    this.listarCategoria();

  }

  catProdObjeto(): CategoriaProduto {
    return{
      id: this.catForm.get('id')?.value!,
      nomeDesc: this.catForm.get('descricao')?.value!,
      empresa : this.loginService.objetoEmpresa()
    }
  }

  cadProdutoCategoria() {
    const categoriaProduto = this.catProdObjeto();
    this.service.cadastrarPrduto(categoriaProduto).subscribe({
      next: () => {
        // Resetar o formulário após cadastrar
        this.catForm.reset();
        // Atualizar a lista de categorias
        this.listarCategoria();
      },
      error: (error) => {
        console.error('Erro ao cadastrar a categoria', error);
      }
    });
  }


  listarCategoria(){
    this.service.listarCategoria().subscribe({
      next: (res) =>{
        this.lista = res
        console.log(this.lista)
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

}
