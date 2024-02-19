import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../Usuario';
import { Perfil } from 'src/app/perfil/Perfil';
import { PerfilService } from 'src/app/perfil/service/perfil.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  public perfiles : Perfil[] = [];
  public usuarios : Usuario[] = [];
  public guardarForm : FormGroup;
  public actualizaForm : FormGroup;
  public checkboxFormGroup : FormGroup;
  public actualizarCheckbox: boolean = false;

  constructor(private usuarioService : UsuarioService,
    private perfilService : PerfilService,
    private formBuilder : FormBuilder) {
      this.guardarForm = this.formBuilder.group({
        nombre: new FormControl ("nombre"),
        perfil: new FormControl ("perfil")
      });
      this.actualizaForm = this.formBuilder.group({
        id : new FormControl("id"),
        nombre: new FormControl("nombre"),
        perfil: new FormControl("perfil")
      });
      this.checkboxFormGroup = this.formBuilder.group({
        checkbox : new FormControl("checkbox"),
      });
    }

  ngOnInit () {
    this.cargarData();
    this.checkboxFormGroup.get("checkbox")?.setValue(false);
  }

  public cargarData () : void {
    this.usuarioService.obtenerTodos().subscribe((usuarios) => {
      usuarios.forEach(usuario => {
        this.usuarios.push(usuario);
      });
    });
    this.perfilService.obtenerTodos().subscribe((perfiles) => {
      perfiles.forEach(perfil => {
        this.perfiles.push(perfil);
      });
    });
  }

  public actualizar () : void {
    let usuario : Usuario = Object.assign({
      nombre: '',
      perfil: Object.assign({})
    })

    usuario.id = this.actualizaForm.get("id")?.value;
    usuario.nombre = this.actualizaForm.get("nombre")?.value;
    usuario.perfil.id = this.actualizaForm.get("perfil")?.value;
    
    console.log('guardando usuario.nombre ' + usuario.nombre);
    console.log('guardando usuario.perfil ' + usuario.perfil.id);

    this.usuarioService.guardar (usuario).subscribe(() => {
      window.location.reload();
    });
  }

  public guardar () : void {
    let usuario : Usuario = Object.assign({
      nombre: '',
      perfil: Object.assign({})
    })

    usuario.nombre = this.guardarForm.get("nombre")?.value;
    usuario.perfil.id = this.guardarForm.get("perfil")?.value;
    
    console.log('guardando usuario.nombre ' + usuario.nombre);
    console.log('guardando usuario.perfil ' + usuario.perfil.id);

    this.usuarioService.guardar (usuario).subscribe(() => {
      window.location.reload();
    });
  }

  public borrar (id : number) : void {
    let usuario : Usuario = Object.assign({});
    usuario.id = id;
    this.usuarioService.borrar(usuario).subscribe(() => {
      window.location.reload();
    });
  }

  public changeActualizar () : void {
    this.actualizarCheckbox = this.checkboxFormGroup.get("checkbox")?.value;
  }
}
