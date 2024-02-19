import { Injectable } from '@angular/core';
import { Aplication } from '../aplicacion/Aplication';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  private aplicacionesUrl: string = "http://localhost:8080/aplicacion";

  constructor(private http: HttpClient) { }

  public async obtenerTodos() : Promise<Aplication[]> {
    return lastValueFrom(this.http.get<Aplication[]>(this.aplicacionesUrl));
  }

  public obtenerTodosConObservable () : Observable<Aplication[]> {
    return this.http.get<Aplication[]>(this.aplicacionesUrl);
  }

  public guardar (aplication : Aplication) : Observable<Aplication> {
    if (aplication.id != null && aplication.id != undefined) {
      return this.http.put<Aplication>(this.aplicacionesUrl, aplication);
    } else {
      return this.http.post<Aplication>(this.aplicacionesUrl, aplication);
    }
  }
  
  public borrar (aplication : Aplication) : Observable<boolean> {
    return this.http.delete<boolean> (this.aplicacionesUrl + "/" + aplication.id);
  }

}
