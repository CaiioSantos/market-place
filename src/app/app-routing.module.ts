import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { guardiaoGuard } from './guard/guardiao.guard';
import { CategoriaProdutoComponent } from './components/categoria-produto/categoria-produto.component';
import { MarcaProdutoComponent } from './marca-produto/marca-produto.component';
import { AcessoComponent } from './acesso/acesso.component';
import { PessoaJuridicaComponent } from './pessoa-juridica/pessoa-juridica.component';
import { PessoaFisicaComponent } from './components/pessoa-fisica/pessoa-fisica.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';
import { CupomDescontoComponent } from './components/cupom-desconto/cupom-desconto.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'categoria-produto', component: CategoriaProdutoComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'marca-produto', component: MarcaProdutoComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'acesso', component: AcessoComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'pessoa-juridica', component: PessoaJuridicaComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'pessoa-fisica', component: PessoaFisicaComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'usuario', component: UsuarioComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'cupom-desconto', component: CupomDescontoComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'forma-pagamento', component: FormaPagamentoComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
