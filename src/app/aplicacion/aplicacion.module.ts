import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AplicacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AplicacionModule { }
