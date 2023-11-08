import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { VentasProducto } from 'src/app/Models/dashBoard';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private url = 'http://localhost:3000/api/dashBoard';

  constructor(private http: HttpClient) {}

  public getVentasDashBoard(): Observable<VentasProducto[]> {
    return this.http.get<VentasProducto[]>(`${this.url}/ventas`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error(''));
  }
}
