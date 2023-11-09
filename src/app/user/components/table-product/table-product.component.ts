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
    this.showData = this.producData
    this.showData.sort((a, b) => a.Precio - b.Precio);
  }

  sortDown(){
    this.showData = this.producData
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
    if(!this.productSelected){
      this.toastr.warning('Selecciona un usuario', 'Advertencia');
      return;
    }
    this.productoService.deleteProduct(this.productSelected.Id).subscribe({
      next: (data) => {
        if (data) {
          this.getProducts();
          this.toastr.success('Producto eliminado', 'Completado');
        } else {
          this.toastr.error('No se pudo eliminar el producto', 'Error');
        }
      },
      error: (error) => {
        this.toastr.error('Ocurrió un error al eliminar el producto', 'Error');
      }
    });
  }

  editDialog() {
    if(!this.productSelected){
      this.toastr.warning('Selecciona un usuario', 'Advertencia');
      return;
    }
    this.dialogService.openEditDialog(this.productSelected);
  }

  addDialog() {
    const producto: Producto = {
      Id: 0,
      Nombre: '',
      Precio: 0,
      Stock: 0,
      Descripcion: '',
    };
    this.dialogService.openAddDialog(producto);
  }

  formatPrecio(precio: number): string {
    return this.sharedFunctions.formatPrecio(precio);
  }
}
