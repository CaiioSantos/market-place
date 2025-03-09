import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorProjetoInterceptor } from './interceptor/interceptor-projeto.interceptor';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriaProdutoComponent } from './categoria-produto/categoria-produto.component';
import { MarcaProdutoComponent } from './marca-produto/marca-produto.component';
import { AcessoComponent } from './acesso/acesso.component';
import { PessoaJuridicaComponent } from './pessoa-juridica/pessoa-juridica.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from "ngx-mask";
import { PessoaFisicaComponent } from './components/pessoa-fisica/pessoa-fisica.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CategoriaProdutoComponent,
    MarcaProdutoComponent,
    AcessoComponent,
    PessoaJuridicaComponent,
    PessoaFisicaComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: InterceptorProjetoInterceptor, multi: true },
    provideNgxMask()
],
  bootstrap: [AppComponent]
})
export class AppModule { }
