import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Models/producto.model';
import { ApiService } from 'src/app/service/api.service';
import { SharedFunctionsService } from 'src/app/service/shared-functions.service';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent implements OnInit {

  producData: Producto[];

  constructor(private apiService: ApiService, private sharedFunctions: SharedFunctionsService) { 
    this.producData = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getApiProductos().subscribe((data) => {
      this.producData = data;
    });
  }

  formatPrecio(precio: number): string {
    return this.sharedFunctions.formatPrecio(precio);
  }
}
