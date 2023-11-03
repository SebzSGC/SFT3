import { Component, OnInit } from '@angular/core';
import { CarritoFront } from 'src/app/Models/carrito.model';
import { ApiService } from 'src/app/service/api.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { SharedFunctionsService } from 'src/app/service/shared-functions.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  carrito: CarritoFront[] = [];
  totalToPay: any;
  totalItems: any;
  userId: any;
  totalProductos: number = 0;

  constructor(
    private carritoService: CarritoService,
    private apiService: ApiService,
    private sharedFunctions: SharedFunctionsService
  ) {
    this.apiService.userData.subscribe((userData) => {
      if (userData != null) {
        this.userId = userData.Id;
      }
    });

    this.carritoService.TotalToPay.subscribe((totalToPay) => {
      this.totalToPay = totalToPay;
    });

    this.carritoService.TotalItems.subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
  }

  ngOnInit(): void {

    this.getCart();

    this.apiService.userData.subscribe((userData) => {
      if (userData != null) {
        this.userId = userData.Id;
      } else {
        this.userId = 0;
      }
    });
  }

  formatPrice(precio: number): string {
    return this.sharedFunctions.formatPrecio(precio);
  }

  getCart() {
    this.carritoService.getCarrito(this.userId).subscribe((carrito) => {
      this.carrito = carrito;
    });
    this.carritoService.getTotalToPay(this.userId);
    this.carritoService.getTotalItems(this.userId);
  }
}
