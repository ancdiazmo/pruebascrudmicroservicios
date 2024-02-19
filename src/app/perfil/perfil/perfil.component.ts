import { Component } from '@angular/core';
import { PerfilService } from '../service/perfil.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Perfil } from '../Perfil';
import { Aplication } from 'src/app/aplicacion/aplicacion/Aplication';
import { AplicacionService } from 'src/app/aplicacion/service/aplicacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public aplicaciones : Aplication[] = [];
  public perfiles : Perfil[] = [];
  public guardarForm : FormGroup;
  public actualizaForm : FormGroup;
  public checkboxFormGroup : FormGroup;
  public actualizarCheckbox: boolean = false;

  ngOnInit () {
    this.cargarPerfilesYAplicaciones();
    this.checkboxFormGroup.get("checkbox")?.setValue(false);
  }

  constructor(private perfilService : PerfilService,
    private formBuilder: FormBuilder,
    private aplicacionService : AplicacionService) {
      this.guardarForm = this.formBuilder.group({
        nombre: new FormControl("nombre"),
        apliacacion: new FormControl("apliacacion")
      });
      this.actualizaForm = this.formBuilder.group({
        id : new FormControl("id"),
        nombre: new FormControl("nombre"),
        apliacacion: new FormControl("apliacacion")
      });
      this.checkboxFormGroup = this.formBuilder.group({
        checkbox : new FormControl("checkbox"),
      });
  }

  public cargarPerfilesYAplicaciones () : void {
    this.perfilService.obtenerTodos().subscribe((perfiles) => {
      perfiles.forEach(perfil => {
        this.perfiles.push(perfil);
      });
    });
    this.aplicacionService.obtenerTodosConObservable().subscribe((aplicaciones) => {
      aplicaciones.forEach(aplicacion => {
        this.aplicaciones.push(aplicacion);
      });
    });
  }

  public actualizar () : void {
    let perfil : Perfil = Object.assign({
      id: 0,
      nombre: '',
      aplicacion: Object.assign({})
    });

    perfil.id = this.actualizaForm.get('id')?.value;
    perfil.nombre = this.actualizaForm.get('nombre')?.value;
    perfil.aplicacion.id = this.actualizaForm.get('apliacacion')?.value;

    console.log('Guardando nombre_perfil: ' + perfil.nombre);
    console.log('Guardando id_aplicacion_perfil ' + perfil.aplicacion.id);

    this.perfilService.guardar(perfil).subscribe (() => {
      window.location.reload();
    });
  }

  public guardar () : void {
    let perfil : Perfil = Object.assign({
      nombre: '',
      aplicacion: Object.assign({})
    });

    perfil.nombre = this.guardarForm.get('nombre')?.value;
    perfil.aplicacion.id = this.guardarForm.get('apliacacion')?.value;

    console.log('Guardando nombre_perfil: ' + perfil.nombre);
    console.log('Guardando id_aplicacion_perfil ' + perfil.aplicacion.id);

    this.perfilService.guardar(perfil).subscribe (() => {
      window.location.reload();
    });
  }

  public borrar (id : number) : void {
    let perfil : Perfil = Object.assign({});
    perfil.id = id;
    this.perfilService.borrar(perfil).subscribe (() => {
      window.location.reload();
    });
  }

  public changeActualizar () : void {
    this.actualizarCheckbox = this.checkboxFormGroup.get("checkbox")?.value;
  }

}
