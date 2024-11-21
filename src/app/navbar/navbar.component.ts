import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private service: LoginService,
    private route: Router ){

  }



  ngOnInit(): void {
  }

  deslogar(): void {
    this.service.deslogarUsuario()
  }

}
