import { Component, OnInit } from '@angular/core';
import { CategoriaProdutoService } from '../service/categoria-produto.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaProduto } from '../model/categoria-produto';
import { PessoaJuridica } from '../model/pessoa-juridica';

@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.scss']
})
export class CategoriaProdutoComponent implements OnInit {

  constructor(private form: FormBuilder, private service: CategoriaProdutoService, private route: Router){
  }


  catForm = this.form.group({
    id:[],
    descricao:[null,Validators.required] })

  ngOnInit(): void {
  }

  catProdObjeto(): CategoriaProduto {
    var  empresa = new PessoaJuridica(Number(localStorage.getItem('empresa')))
    return{
      id: this.catForm.get('id')?.value!,
      descricao: this.catForm.get('descricao')?.value!,
      empresa: empresa
    }
  }

  cadProdutoCategoria(){
    const categoriaProduto = this.catProdObjeto();
 console.info(categoriaProduto);
    this.service.cadastrarPrduto(categoriaProduto);
  }
}
