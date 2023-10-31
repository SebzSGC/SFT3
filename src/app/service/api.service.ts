import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import   {Usuario}    from '../Models/usuario.model'
import { Producto } from '../Models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userUrl = 'http://localhost:3000/api/usuarios';
  private productUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.userUrl);
  }

  public getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productUrl);
  }

}
