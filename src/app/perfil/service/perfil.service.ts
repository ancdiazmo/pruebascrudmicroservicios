import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../Perfil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private aplicacionesUrl: string = "http://localhost:8080/perfil";

  constructor(private http: HttpClient) {}

  public obtenerTodos () : Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.aplicacionesUrl);
  }

  public guardar (perfil : Perfil) : Observable<Perfil> {
    if (perfil.id != null && perfil.id != undefined) {
      return this.http.put<Perfil>(this.aplicacionesUrl, perfil);
    } else {
      return this.http.post<Perfil>(this.aplicacionesUrl, perfil);
    }
  }

  public borrar (perfil : Perfil) : Observable<boolean> {
    return this.http.delete<boolean>(this.aplicacionesUrl + "/" + perfil.id);
  } 
}
