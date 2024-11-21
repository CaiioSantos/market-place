import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { guardiaoGuard } from './guard/guardiao.guard';
import { CategoriaProdutoComponent } from './categoria-produto/categoria-produto.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}},
  {path: 'categoria-produto', component: CategoriaProdutoComponent, canActivate:[guardiaoGuard],data:{role:['ROLE_ADMIN','ROLE_USER','ROLE_FUNCIONARIO']}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
