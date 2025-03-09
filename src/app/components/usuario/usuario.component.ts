import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  lista = new Array<Usuario>();

  constructor(private form: FormBuilder, private loginService: LoginService, private usuarioService: UsuarioService){

  }

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
}
