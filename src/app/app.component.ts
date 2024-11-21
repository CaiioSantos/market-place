import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './model/usuario';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'market-place';

  constructor(
    private service: LoginService,
    private route: Router ){

  }
  ngOnInit(): void {
    if(this.service.usuarioLogado()){
      this.route.navigate(['home'])
    }else{
      this.route.navigate(['login'])
    }
  }

  usuarioLogado(){
    return this.service.usuarioLogado();
  }

}
