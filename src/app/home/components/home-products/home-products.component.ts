import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Carrito } from 'src/app/Models/carrito.model';
import { Producto } from 'src/app/Models/producto.model';
import { CarritoService } from 'src/app/service/Carrito/carrito.service';
import { ProductosService } from 'src/app/service/Producto/productos.service';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';
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
  searchValue: string = '';
  filteredProductos: Producto[] = [];

  constructor(
    private productoService: ProductosService,
    private usuarioService: UsuarioService,
    private carritoService: CarritoService,
    private sharedFunctions: SharedFunctionsService
  ) {
    this.listaproductos = [];

    this.sharedFunctions.on('searchValueChanged', (value) => {
      this.searchValue = value;
      this.getProductoBySearchValue()
    });

    this.usuarioService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.usuarioService.userData.subscribe((userData) => {
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

    this.usuarioService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoginIn = isLoggedIn; 
    });

  }

  getProducts() {
    this.productoService.getApiProductos().pipe(
      map((data: Producto[]) => data.filter((producto) => producto.Stock > 0))
    ).subscribe((filteredData: Producto[]) => {
      this.listaproductos = filteredData;
      this.filteredProductos = filteredData;
    });
  }

  getProductoBySearchValue() {
    this.filteredProductos = this.listaproductos.filter((producto) => {
      return producto.Nombre.toLowerCase().includes(this.searchValue.toLowerCase()); 
    })
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
