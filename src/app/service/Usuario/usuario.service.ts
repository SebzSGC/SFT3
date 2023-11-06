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
import { Usuario } from '../../Models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userUrl = 'http://localhost:3000/api/usuarios';

  public currentLoginOn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public currentUserData: BehaviorSubject<Usuario|null> =
    new BehaviorSubject<Usuario|null>(null);

  constructor(private http: HttpClient) {}

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.userUrl}`);

  }
  get userData(): Observable<Usuario|null> {
    return this.currentUserData.asObservable();
  }
  
  get isLoggedIn(): Observable<boolean> {
    return this.currentLoginOn.asObservable();
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

  public createUsuario(usuario: Usuario): Observable<boolean> {
    return this.http
      .post<boolean>(this.userUrl, usuario)
      .pipe(catchError(this.handleError));
  }
  
  public getAuthToken(): Observable<boolean> {
    return of(this.currentLoginOn.value);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error(''));
  }

}
