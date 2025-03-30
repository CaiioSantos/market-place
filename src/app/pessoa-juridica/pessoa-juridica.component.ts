import { Component, OnInit } from '@angular/core';
import { PessoaJuridica } from '../model/pessoa-juridica';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PessoaJuridicaService } from '../service/pessoa-juridica.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { Endereco } from '../model/endereco';
import { EnderecoService } from '../service/endereco.service';

@Component({
  selector: 'app-pessoa-juridica',
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.scss']
})
export class PessoaJuridicaComponent implements OnInit {

  lista = new Array<PessoaJuridica>();
    enderecos =  new Array<Endereco>()
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
        endereco: [this.enderecos],
        empresa: [this.loginService.objetoEmpresa(), Validators.required]

      });

      enderecoForm = this.form.group({
        id: new FormControl<number | null>(null),
        ruaLogra: new FormControl<string | null>(null),
        cep: new FormControl<string | null>(null, Validators.required),
        numero: new FormControl<string | null>(null, Validators.required),
        complemento: new FormControl<string | null>(null, Validators.required),
        bairro: new FormControl<string | null>(null, Validators.required),
        uf: new FormControl<string | null>("", Validators.required),
        cidade: new FormControl<string | null>(null),
        estado: new FormControl<string | null>(null, Validators.required),
        tipoEndereco: new FormControl<string | null>(""),
        empresa: [this.loginService.objetoEmpresa(), Validators.required]

      });

constructor(private form: FormBuilder, private service: PessoaJuridicaService,
     private route: Router, private loginService: LoginService,private enderecoService : EnderecoService){
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

  cadastrarPessoaJuridica() {
    const pessoaJuridica = this.catProdObjeto();
    console.info(pessoaJuridica);
    this.service.cadastrarPessoaJuridica(pessoaJuridica).subscribe({
      next: () => {
        this.limpar();
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
          enderecos: this.enderecos,
          empresa : this.pessoaJuridicaForm.get('empresa')?.value!,
        }
      }

      enderecoObjeto(): Endereco {
        return{
          id: this.enderecoForm.get('id')?.value!,
          ruaLogra: this.enderecoForm.get('ruaLogra')?.value!,
          cep: this.enderecoForm.get('cep')?.value!,
          numero: this.enderecoForm.get('numero')?.value!,
          complemento : this.enderecoForm.get('complemento')?.value!,
          bairro: this.enderecoForm.get('bairro')?.value!,
          uf: this.enderecoForm.get('uf')?.value!,
          cidade : this.enderecoForm.get('cidade')?.value!,
          estado: this.enderecoForm.get('estado')?.value!,
          tipoEndereco: this.enderecoForm.get('tipoEndereco')?.value!,
        }
      }

      limpar() {
        this.pessoaJuridicaForm.reset();
      }
      limparEnd() {
        this.enderecoForm.reset();
      }

      addEndereco(){
        const endereco = this.enderecoObjeto();

        if (endereco.id && endereco.id != undefined) {
          for (let index = 0; index < this.enderecos.length; index++) {
            var element = this.enderecos[index];
              if (element.cep === endereco.cep || element.id === endereco.id) {
                return;
              }
          }

        }
        const enderecoExistente = this.enderecos.findIndex(end => end.cep === endereco.cep);
        const enderecoExistenteId = this.enderecos.findIndex(end => end.id === endereco.id);

        if (enderecoExistente >= 0 && enderecoExistenteId >= 0) {
          this.enderecos.splice(enderecoExistente, 1);
        }

        this.enderecos.push(endereco);
      }

      removerPessoaJuridica(endereco: Endereco){
        var confirma = confirm('Deseja remover Endereço?')
        if(confirma){
          const enderecoExistente = this.enderecos.findIndex(e => e.cep === endereco.cep);
          this.enderecos.splice(enderecoExistente, 1);
          this.enderecoService.excluirEndereco(endereco);

      }
    }

      editarPessoaJuridica(pessoaJuridica: PessoaJuridica): void {

      this.service.buscarPorId(pessoaJuridica.id).subscribe({
        next:(res) => {

          this.pessoaJuridica = res;
          this.enderecos = this.pessoaJuridica.enderecos !== undefined ? this.pessoaJuridica.enderecos : new Array<Endereco>();
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
            endereco: this.enderecos ?? null,
            empresa: this.pessoaJuridica.empresa ?? null

          });
        },
        error(err) {
          console.error('Erro ao buscar produto por ID:', err);
        },
      });

    }

    excluirPessoaJuridica(pessoaJuridica: PessoaJuridica): void {
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

    verEndereco(endereco: Endereco): void {
      this.enderecoForm = this.form.group({
        id: new FormControl<number | null>(endereco.id ?? null),
        ruaLogra: new FormControl<string | null>(endereco.ruaLogra ?? null, Validators.required),
        cep: new FormControl<string | null>(endereco.cep ?? null, Validators.required),
        numero: new FormControl<string | null>(endereco.numero ?? null, Validators.required),
        complemento: new FormControl<string | null>(endereco.complemento ?? null, Validators.required),
        bairro: new FormControl<string | null>(endereco.bairro ?? null, Validators.required),
        uf: new FormControl<string | null>(endereco.uf ?? "", Validators.required),
        cidade: new FormControl<string | null>(endereco.cidade ?? null, Validators.required),
        estado: new FormControl<string | null>(endereco.estado ?? null, Validators.required),
        tipoEndereco: new FormControl<string | null>(endereco.tipoEndereco ?? ""),
        empresa: [this.loginService.objetoEmpresa(), Validators.required]
      });
    }

}
