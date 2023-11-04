import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Carrito, CarritoFront } from '../Models/carrito.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private cartUrl = 'http://localhost:3000/api/carrito';
  private productId: BehaviorSubject<number>;
  private totalToPay: BehaviorSubject<number>;
  private totalItems: BehaviorSubject<number>;
  private cart: BehaviorSubject<Carrito[]>;

  constructor(private http: HttpClient) {
    this.totalItems = new BehaviorSubject<number>(0);
    this.totalToPay = new BehaviorSubject<number>(0);
    this.cart = new BehaviorSubject<Carrito[]>([]);
    this.productId = new BehaviorSubject<number>(0);
  }

  public updateProductId(Id_Producto: number): void {
    this.productId.next(Id_Producto);
  }

  //obtener oberservables
  get TotalToPay() {
    return this.totalToPay.asObservable();
  }

  get TotalItems() {
    return this.totalItems.asObservable();
  }

  get CartData() {
    return this.cart.asObservable();
  }

  get ProductId() {
    return this.productId.asObservable();
  }

  //Peticiones a la API
  public getCarrito(Id_Usuario: number): Observable<CarritoFront[]> {
    return this.http
      .get<CarritoFront[]>(`${this.cartUrl}/front/${Id_Usuario}`)
      .pipe(catchError(this.handleError));
  }

  public getCartData(Id_Usuario: number): void {
    this.http
      .get<Carrito[]>(`${this.cartUrl}/${Id_Usuario}`)
      .pipe(catchError(this.handleError))
      .subscribe((cart) => {
        this.cart.next(cart);
      });
  }

  public getTotalToPay(Id_Usuario: number): void {
     this.http
      .get<number>(`${this.cartUrl}/chk/${Id_Usuario}`)
      .pipe(catchError(this.handleError))
      .subscribe((totalToPay) => {
        this.totalToPay.next(totalToPay);
      });
  }

  public getTotalItems(Id_Usuario: number): void {
    this.http
      .get<number>(`${this.cartUrl}/productos/total/${Id_Usuario}`)
      .pipe(catchError(this.handleError))
      .subscribe((totalItems) => {
        this.totalItems.next(totalItems);
      });
  }

  public postProductToCart(carrito: Carrito): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.cartUrl}`, carrito)
      .pipe(catchError(this.handleError));
  }

  public postFinishCart(Id_Usuario: number): Observable<boolean> {
    const data: any = {"Id_Usuario":Id_Usuario}
     return this.http
      .post<boolean>(`${this.cartUrl}/cerrar`, data )
      .pipe(catchError(this.handleError));
  }
  
  public UpdateUnitProductFromCart(Id_Producto: number, Cantidad: number): void {
    const data: any ={"Id_Producto":Id_Producto, "cantidad": Cantidad}
    this.http
      .put(`${this.cartUrl}`, data)
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  public DeletProductFromCart(Id_Producto: number): void {
    this.http
      .delete(`${this.cartUrl}/${Id_Producto}`)
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  //atrapar errores
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error(''));
  }
}
