import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private form: FormBuilder, private service: LoginService, private route: Router){

  }

  loginform = this.form.group({
    id:[],
    login:[null,Validators.required],
    senha:[null, Validators.required],
  })

  loginObjeto(): Usuario {
    return{
      login: this.loginform.get('login')?.value!,
      senha: this.loginform.get('senha')?.value!
    }
  }
  fazerLogin(){
    const usuario = this.loginObjeto();

    this.service.logar(usuario);
    this.route.navigate(['home'])
  }

  recuperarSenha(){
    const usuario = this.loginObjeto();
    var login = usuario.login;

    if(login == ''){
      alert('informe o login para alterar a senha')
    }else{
      this.service.recuperarSenha(login);
    }
  }

}
