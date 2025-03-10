import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/model/pessoa';
import { UserPessoa } from 'src/app/model/user-pessoa';
import { Usuario } from 'src/app/model/usuario';
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

  constructor(private form: FormBuilder, private loginService: LoginService, private usuarioService: UsuarioService){

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

  userObjeto(): Usuario {
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

              this.usuarioForm.setValue({
                id: this.usuario.id ?? null,
                login: this.usuario.login ?? null,
                senha: this.usuario.senha ?? null,
                pessoa: this.usuario.pessoa?.nome ?? null
              });
            },
            error(err) {
              console.error('Erro ao buscar produto por ID:', err);
            },
          });
        }
}
