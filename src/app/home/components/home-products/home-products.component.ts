import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Models/producto.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
})
export class HomeProductsComponent implements OnInit {
  listaproductos: Producto[];

  constructor(private apiService: ApiService) {
    this.listaproductos = [];
  }

  ngOnInit(): void { 
    this.getProducts();
  }

  getProducts() {
    this.apiService.getApiProductos().subscribe((data)=>{
      this.listaproductos = data;
    })
  }

  formatPrecio(precio: number): string {
    return precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  }
}
