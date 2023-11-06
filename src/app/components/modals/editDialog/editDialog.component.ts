import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/Models/producto.model';
import { ProductosService } from 'src/app/service/Producto/productos.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './editDialog.component.html',
  styleUrls: ['./editDialog.component.css'],
})
export class editDialogComponent {
  EditForm = this.formBuidler.group({
    Id:[this.producto.Id],
    Nombre: [this.producto.Nombre, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    Precio: [this.producto.Precio, [Validators.required, Validators.pattern('^[0-9]+$')]],
    Stock: [this.producto.Stock, [Validators.required, Validators.pattern('^[0-9]+$')]],
    Descripcion: [this.producto.Descripcion, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
    private editDialog: DialogService,
    private formBuidler: FormBuilder,
    private productService: ProductosService,
    private toastr: ToastrService
  ) {}

  close(): void {
    this.editDialog.closeDialog();
  }

  sendProduct(){
    if (this.EditForm.valid) {
      this.productService
        .updateProduct(this.EditForm.value as Producto)
        .subscribe({
          next: (response) => {
            if (response) {
              this.toastr.success('Producto editado', 'Completado');
            } else {
              this.toastr.error('No se pudo editar el producto', 'Error');
            }
          },
          error: (error) => {
            this.toastr.error('Algo ha salido mal, intentalo de nuevo', error);
          }
        });
    } else {
      this.EditForm.markAllAsTouched();
      this.toastr.warning('Revisa los campos', '');
    }
  }

  get Nombre() {
    return this.EditForm.controls.Nombre;
  }

  get Precio() {
    return this.EditForm.controls.Precio;
  }

  get Stock() {
    return this.EditForm.controls.Stock;
  }

  get Descripcion() {
    return this.EditForm.controls.Descripcion;
  }
}
