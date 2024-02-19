import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private aplicacionesUrl: string = "http://localhost:8080/usuario";

  constructor(private http : HttpClient) {}

  public obtenerTodos () : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.aplicacionesUrl);
  }

  public guardar (usuario: Usuario) : Observable<Usuario> {
    if (usuario.id != null && usuario.id != undefined) {
      return this.http.put<Usuario>(this.aplicacionesUrl, usuario);
    } else { 
      return this.http.post<Usuario>(this.aplicacionesUrl, usuario);
    }
  }

  public borrar (usuario : Usuario) : Observable<boolean> {
    return this.http.delete<boolean> (this.aplicacionesUrl + "/" + usuario.id);
  }
}
