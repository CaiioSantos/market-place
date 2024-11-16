import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './model/usuario';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'market-place';

  constructor(private form: FormBuilder, private service: LoginService){

  }

}
