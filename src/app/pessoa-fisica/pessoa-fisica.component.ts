import { Component, OnInit } from '@angular/core';
import { PessoaFisica } from '../model/pessoa-fisica';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PessoaFisicaService } from '../service/pessoa-fisica.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Endereco } from '../model/endereco';
import { EnderecoService } from '../service/endereco.service';

@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.scss']
})
export class PessoaFisicaComponent implements OnInit {


    lista = new Array<PessoaFisica>();
    enderecos =  new Array<Endereco>()
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

  constructor(private form: FormBuilder, private service: PessoaFisicaService,
       private route: Router, private loginService: LoginService,private enderecoService : EnderecoService){
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
            enderecos: this.enderecos,
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
            this.enderecos = this.pessoaFisica.enderecos !== undefined ? this.pessoaFisica.enderecos : new Array<Endereco>();
            this.pessoafisicaForm.setValue({
              id: this.pessoaFisica.id ?? null,
              cpf: this.pessoaFisica.cpf ?? null,
              nome: this.pessoaFisica.nome ?? null,
              dataNascimento: this.pessoaFisica.dataNascimento ?? null,
              email: this.pessoaFisica.email ?? null,
              telefone: this.pessoaFisica.telefone ?? null,
              tipoPessoa: this.pessoaFisica.tipoPessoa ?? null,
              endereco: this.enderecos,
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

      addEndereco(){
        const endereco = this.enderecoObjeto();
        if (endereco.id && endereco.id != undefined) {
          for (let index = 0; index < this.enderecos.length; index++) {
            var element = this.enderecos[index];
              if (element.cep === endereco.cep && element.id) {
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
        this.limparEnd();
      }

      removerEndereco(endereco: Endereco){
        var confirma = confirm('Deseja remover Endereço?')
        if(confirma){
          const enderecoExistente = this.enderecos.findIndex(e => e.cep === endereco.cep);
          this.enderecos.splice(enderecoExistente, 1);
          this.enderecoService.excluirEndereco(endereco);
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

    limparEnd() {
      this.enderecoForm.reset();
    }
}
