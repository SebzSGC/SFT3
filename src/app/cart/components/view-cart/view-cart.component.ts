import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private sharedFunctions: SharedFunctionsService,
    private toastr: ToastrService
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
      this.carritoService.getTotalToPay(this.userId);
      this.carritoService.getTotalItems(this.userId);
    }); 
  }

  upItem(Id_Producto: number, cantidad: number, stock: number) {
    if(cantidad === stock){
      this.toastr.error('Por ahora no tenemos suficiente stock', '');
    }else{
      this.carritoService.UpdateUnitProductFromCart(Id_Producto, (cantidad + 1));
      this.getCart();
      this.toastr.success('Cantidad agregada', '');
    }
  }

  downItem(Id_Producto: number, cantidad: number) {
    if(cantidad === 1){
      this.deleteItem(Id_Producto);
    }else{
      this.carritoService.UpdateUnitProductFromCart(Id_Producto, (cantidad - 1));
      this.getCart();
      this.toastr.success('Cantidad eliminada', '');
    }
  }

  deleteItem(Id_Producto: number) {
    this.carritoService.DeletProductFromCart(Id_Producto);
    this.getCart();
    this.toastr.success('Producto eliminado','');
  }

  Comprar(){
    if(this.carrito[0] === null || this.carrito[0] === undefined || this.carrito[0].Id === null){
      this.toastr.error('No hay productos en el carrito', '');
    }else{
      this.carritoService.postFinishCart(this.userId).subscribe((response) => {
        if(response){
          this.toastr.success('Compra realizada', '');
          this.getCart();
        }
        else{
          this.toastr.error('Error al realizar la compra', '');
        }
      })
    }
  }
}
