import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/Models/producto.model';
import { ProductosService } from 'src/app/service/Producto/productos.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent {
  AddForm = this.formBuidler.group({
    Id:[],
    Nombre: [, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    Precio: [, [Validators.required, Validators.pattern('^[0-9]+$')]],
    Stock: [, [Validators.required, Validators.pattern('^[0-9]+$')]],
    Descripcion: [, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
    private addDialog: DialogService,
    private formBuidler: FormBuilder,
    private productService: ProductosService,
    private toastr: ToastrService
  ) {}

  close(): void {
    this.addDialog.closeDialog();
  }

  addProduct(){
    if (this.AddForm.valid) {
      this.productService
        .addProduct(this.AddForm.value as unknown as Producto)
        .subscribe({
          next: (response) => {
            if (response) {
              this.toastr.success('Producto agregado', 'Completado');
              this.addDialog.closeDialog();
            } else {
              this.toastr.error('No se pudo agregar el producto', 'Error');
              this.addDialog.closeDialog();
            }
          },
          error: (error) => {
            this.toastr.error('Algo ha salido mal, intentalo de nuevo', error);
          }
        });
    } else {
      this.AddForm.markAllAsTouched();
      this.toastr.warning('Revisa los campos', '');
    }
  }

  get Nombre() {
    return this.AddForm.controls.Nombre;
  }

  get Precio() {
    return this.AddForm.controls.Precio;
  }

  get Stock() {
    return this.AddForm.controls.Stock;
  }

  get Descripcion() {
    return this.AddForm.controls.Descripcion;
  }
}
