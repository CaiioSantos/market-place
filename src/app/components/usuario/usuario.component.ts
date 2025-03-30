import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Acesso } from 'src/app/model/acesso';
import { Pessoa } from 'src/app/model/pessoa';
import { UserPessoa } from 'src/app/model/user-pessoa';
import { Usuario } from 'src/app/model/usuario';
import { AcessoService } from 'src/app/service/acesso.service';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {



  lista = new Array<UserPessoa>();
  usuario: UserPessoa | undefined ;
  acessos = new Array<Acesso>;
  constructor(private form: FormBuilder, private loginService: LoginService, private usuarioService: UsuarioService, private acessoService: AcessoService){

  }

  usuarioForm = this.form.group({
            id: new FormControl<Number | null>(null),
            login: new FormControl<String | null>(null),
            senha: new FormControl<String | null>(null),
            pessoa: new FormControl<String | null>(null)
          });

  ngOnInit(): void {
    this.listUser();
    console.info(this.lista)
  }

  listUser(){
    this.usuarioService.listarUsuarioPorEmpresa().subscribe({
      next: (res) =>{
        this.lista = res
      },
      error: (error) => {
        alert(error)
      }
    })
  }

   cadastrarUsuario(): void {
        const usuario = this.userObjeto();

        this.usuarioService.cadastrarUsuario(usuario).subscribe({
          next: () => {
            this.limpar();
            this.listUser();
          },
          error: (error) => {
            console.error('Erro ao cadastrar a marca', error);
          }
        });
      }

  userObjeto(): UserPessoa {
      return{
        id: this.usuarioForm.get('id')?.value!,
        login: this.usuarioForm.get('login')?.value!,
        senha : this.usuarioForm.get('senha')?.value!
      }
    }

    limpar() {
      this.usuarioForm.reset();
    }
  editarUsuario(usuarioEdit: UserPessoa): void {

          this.usuarioService.buscarPorId(usuarioEdit.id).subscribe({
            next:(res) => {
              this.usuario = res;

              console.info(this.usuario.acessos)

              this.usuarioForm.setValue({
                id: this.usuario.id ?? null,
                login: this.usuario.login ?? null,
                senha: this.usuario.senha ?? null,
                pessoa: this.usuario.pessoa?.nome ?? null
              });

               this.acessoService.listarAcessoTodos().subscribe({

                next:(res) => {
                  this.acessos = res;//todos os acessos do banco
                  let acessosUsuario = this.usuario?.acessos; // acessos do usuario

                  this.acessos.forEach(acesso => {
                    acesso.possuiAcesso = acessosUsuario?.some(acessoUsuario => acessoUsuario.id === acesso.id) || false;
                  });




                },error(err) {
                  console.error('Erro ao buscaros acessos:', err);

                },

              });

            },
            error(err) {
              console.error('Erro ao buscar produto por ID:', err);
            },
          });
        }

      excluirUsuario(user: UserPessoa) {
        var userSession = localStorage.getItem('id');
        if (userSession?.valueOf == user.id) {
          alert('Não permite excluir o prorio usuario')
          return false;
        }

        var confirma  = confirm('deseja mesmo excluir?');

        if (confirma) {
          this.usuarioService.excluirUsuario(user)

        }
        this.listUser();
        return true;
       }

      adicionaRemoveAcesso(acesso: Acesso): void {
      this.usuarioService.adicionaRemoveAcesso(acesso, this.usuario?.id)
      }


}
