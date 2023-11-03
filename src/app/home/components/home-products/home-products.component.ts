import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Models/carrito.model';
import { Producto } from 'src/app/Models/producto.model';
import { ApiService } from 'src/app/service/api.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { SharedFunctionsService } from 'src/app/service/shared-functions.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
})
export class HomeProductsComponent implements OnInit {
  listaproductos: Producto[];
  isLoginIn: boolean = false;
  productId: any;
  userId: any;
  carritoData: Carrito[] = [];
  productoAgregado: boolean = false;

  constructor(
    private apiService: ApiService,
    private carritoService: CarritoService,
    private sharedFunctions: SharedFunctionsService
  ) {
    this.listaproductos = [];

    this.apiService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.apiService.userData.subscribe((userData) => {
            if (userData != null) {
              this.userId = userData.Id;
            }
          });
        }
      },
    });

    this.carritoService.CartData.subscribe((carrito) => {
      this.carritoData = carrito;
    });

  }

  ngOnInit(): void {
    
    this.getProducts();

    this.apiService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoginIn = isLoggedIn; 
    });

  }

  getProducts() {
    this.apiService.getApiProductos().subscribe((data) => {
      this.listaproductos = data;
    });
  }

  formatPrecio(precio: number): string {
    return this.sharedFunctions.formatPrecio(precio);
  }

  senIdProducto(Id_Producto: number) {
    this.carritoService.updateProductId(Id_Producto);
    this.productId = Id_Producto;
    this.addProductToCart();
    this.infoProducts(this.userId);
  }

  addProductToCart() {
    this.carritoData = [{
      Id_Usuario: this.userId,
      Id_Producto: this.productId,
      Fecha_Creacion: new Date(),
      Cantidad_Producto: 1
    }]
    this.carritoService.postProductToCart(this.carritoData[0]).subscribe((data) => {
      if (data) {
        this.productoAgregado = true;
      }
    });
  }

  infoProducts(Id_Usuario: number){
    this.carritoService.getTotalItems(Id_Usuario)
  }

}
