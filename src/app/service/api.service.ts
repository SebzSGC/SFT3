import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, catchError, throwError, of } from 'rxjs';
import { Usuario } from '../Models/usuario.model';
import { Producto } from '../Models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userUrl = 'http://localhost:3000/api/usuarios';
  private productUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  public getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.productUrl}`)
  }

  public getUsuario(correo: string, contrasena: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.userUrl}/${correo}/${contrasena}`)
      .pipe(
        catchError(error => {
          if(error.status === 404) {
            return of(false)
          }
          return of(error);
        })
      )
  }

  public getProductos(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(`${this.productUrl}`)
  }

  public createUsuario(usuario: Usuario): Observable<boolean> {
    return this.http
      .post<boolean>(this.userUrl, usuario)
  }
}
