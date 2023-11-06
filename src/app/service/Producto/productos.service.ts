import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from 'src/app/Models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  public getApiProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productUrl).pipe(
      catchError(this.handleError)
    );
  }

  public updateProduct(producto: Producto): Observable<boolean> {
    return this.http.put<boolean>(this.productUrl,producto).pipe(
      catchError(this.handleError)
    );
  }

  public deleteProduct(Id_Producto: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.productUrl}/${Id_Producto}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error(''));
  }
}
