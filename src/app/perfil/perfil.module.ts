import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
