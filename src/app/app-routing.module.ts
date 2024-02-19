import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionComponent } from './aplicacion/aplicacion/aplicacion.component';
import { PerfilComponent } from './perfil/perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';

const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
