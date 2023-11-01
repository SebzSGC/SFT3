import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Observable,
  catchError,
  BehaviorSubject,
  tap,
  throwError,
  of,
} from 'rxjs';
import { Usuario } from '../Models/usuario.model';
import { Producto } from '../Models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userUrl = 'http://localhost:3000/api/usuarios';
  private productUrl = 'http://localhost:3000/api/productos';

  public currentLoginOn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public currentUserData: BehaviorSubject<Usuario> =
    new BehaviorSubject<Usuario>({
      Nombre: '',
      Cedula: '',
      Cargo: '',
      Correo: '',
      Contrasena: '',
    });

  constructor(private http: HttpClient) {}

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.productUrl}`);
  }

  public getUsuario(correo: string, contrasena: string): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.userUrl}/${correo}/${contrasena}`)
      .pipe(
        tap((userData: Usuario[]) => {
          this.currentUserData.next(userData[0]);
          if (userData.length > 0) {
            this.currentLoginOn.next(true);
          }
        }),
        catchError(this.handleError)
      );
  }

  public getApiProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productUrl).pipe(
      catchError(this.handleError)
    );
  }

  public createUsuario(usuario: Usuario): Observable<boolean> {
    return this.http
      .post<boolean>(this.userUrl, usuario)
      .pipe(catchError(this.handleError));
  }

  get userData(): Observable<Usuario> {
    return this.currentUserData.asObservable();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.currentLoginOn.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error(''));
  }

  public getAuthToken(): Observable<boolean> {
    return of(this.currentLoginOn.value);
  }

  public isAdmin(): Observable<boolean> {
    return of(this.currentUserData.value.Cargo === 'ADMINISTRADOR');
  }
}
