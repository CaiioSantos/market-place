import { Component, OnInit } from '@angular/core';
import { CategoriaProdutoService } from '../service/categoria-produto.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private form: FormBuilder, private service: CategoriaProdutoService,
     private route: Router, private loginService: LoginService){
  }


  catForm = this.form.group({
    id:[],
    descricao:[null,Validators.required],
  })

  ngOnInit(): void {
    this.service.listarCategoria().subscribe({
      next: (res) =>{
        this.lista = res
        console.log(this.lista)
      },
      error: (error) => {

      }
    })
  }

  catProdObjeto(): CategoriaProduto {
    return{
      id: this.catForm.get('id')?.value!,
      nomeDesc: this.catForm.get('descricao')?.value!,
      empresa : this.loginService.objetoEmpresa()
    }
  }

  cadProdutoCategoria(){
    const categoriaProduto = this.catProdObjeto();
    this.service.cadastrarPrduto(categoriaProduto);
  }

  listarCategoria(){

  }
}
