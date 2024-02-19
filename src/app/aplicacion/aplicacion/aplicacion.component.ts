import { Component } from '@angular/core';
import { AplicacionService } from '../service/aplicacion.service';
import { Aplication } from './Aplication';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent {

  constructor(private service: AplicacionService,
    private formBuilder: FormBuilder) {
      this.checkboxFormGroup = this.formBuilder.group({
        checkbox: new FormControl ("checkbox")
      });
      this.guardarForm = this.formBuilder.group({
        nombre: new FormControl ("nombre")
      });
      this.actualizaForm = this.formBuilder.group({
        id : new FormControl ("id"),
        nombre: new FormControl ("nombre"),
      });
    }
  
  ngOnInit() {
    this.cargarAplicaciones();
    this.checkboxFormGroup.get("checkbox")?.setValue(false);
  }

  public aplicaciones : Aplication[] = [];
  public guardarForm : FormGroup;
  public actualizaForm : FormGroup;
  public checkboxFormGroup : FormGroup;
  public actualizarCheckbox: boolean = false;

  /**public async obtenerTodos() {
    let aplicaciones: Aplication[] = await this.service.obtenerTodos ();
    aplicaciones.forEach(element => {
      console.log(element);
    });
  }*/

  public cargarAplicaciones () : void {
    this.service.obtenerTodosConObservable ().subscribe((aplicacionesRecibidas) => {
      aplicacionesRecibidas.forEach(element => {
        console.log(element);
        this.aplicaciones.push(element);
      });
    });
  }

  public guardar () : void {
    let aplicacion : Aplication = Object.assign({});
    aplicacion.nombre = this.guardarForm.get('nombre')?.value;
    console.log('guardando nombre: ' + aplicacion.nombre);
    this.service.guardar(aplicacion).subscribe(() => {
      window.location.reload();
    });
  } 

  public actualizar () : void {
    let aplicacion : Aplication = Object.assign({});
    aplicacion.id = this.actualizaForm.get('id')?.value != "id"? this.actualizaForm.get('id')?.value : null;
    aplicacion.nombre = this.actualizaForm.get('nombre')?.value;
    console.log('guardando id: ' + aplicacion.id);
    console.log('guardando nombre: ' + aplicacion.nombre);
    this.service.guardar(aplicacion).subscribe(() => {
      window.location.reload();
    });
  } 

  public borrar (id : number) : void {
    let aplicacion : Aplication = Object.assign ({});
    aplicacion.id = id;
    console.log('borrando aplicacion: ' + aplicacion.id);
    this.service.borrar(aplicacion).subscribe(() => {
      window.location.reload();
    });
  }

  public changeActualizar () : void {
    this.actualizarCheckbox = this.checkboxFormGroup.get("checkbox")?.value;
  }
}
