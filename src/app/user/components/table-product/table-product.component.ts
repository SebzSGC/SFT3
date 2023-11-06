import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from 'src/app/Models/producto.model';
import { ProductosService } from 'src/app/service/Producto/productos.service';
import { DialogService } from 'src/app/service/dialog.service';
import { SharedFunctionsService } from 'src/app/service/shared-functions.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css']
})
export class TableProductComponent implements OnInit {

  producData: Producto[];
  sortData: BehaviorSubject<Producto[]>;
  showData: Producto[];
  productSelected: any;

  constructor(private productoService: ProductosService, private sharedFunctions: SharedFunctionsService, private dialogService: DialogService,  private toastr: ToastrService,) { 
    this.producData = [];
    this.sortData = new BehaviorSubject<Producto[]>([]);
    this.showData = [];

    this.sortData.subscribe(data => {
      this.showData = data;
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productoService.getApiProductos().subscribe((data) => {
      this.producData = data;
      this.sortData.next(this.producData);
    });
  }

  sortUp() {
    this.showData.sort((a, b) => a.Precio - b.Precio);
  }

  sortDown(){
    this.showData.sort((a, b) => b.Precio - a.Precio);
  }

  sortStock(){
    this.showData = this.showData.filter((a) => a.Stock === 0);
  }

  resetSort(){
    this.getProducts();
  }
  
  selectedRow(Producto: Producto){
    this.productSelected= Producto;
    this.toastr.info(`Producto seleccionado: ${this.productSelected.Nombre}`, 'Información');
  }

  delete() {
    this.productoService.deleteProduct(this.productSelected.Id).subscribe(
      (data) => {
        if (data) {
          this.getProducts();
          this.toastr.success('Producto eliminado', 'Completado');
        } else {
          this.toastr.error('No se pudo eliminar el producto', 'Error');
        }
      },
      (error) => {
        this.toastr.error('Ocurrió un error al eliminar el producto', 'Error');
      }
    );
  }

  editDialog() {
    this.dialogService.openEditDialog(this.productSelected);
  }

  formatPrecio(precio: number): string {
    return this.sharedFunctions.formatPrecio(precio);
  }
}
