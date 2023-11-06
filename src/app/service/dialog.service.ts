import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { editDialogComponent } from '../components/modals/editDialog/editDialog.component';
import { Producto } from '../Models/producto.model';
import { Usuario } from '../Models/usuario.model';
import { EditUserDialogComponent } from '../components/modals/edit-user-dialog/edit-user-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private MatDialog: MatDialog) { }

  openEditDialog(producto: Producto) {
    this.MatDialog.open(editDialogComponent, {data: producto, width: '500px'});
  }

  openEditUserDialog(usuario: Usuario) {
    this.MatDialog.open(EditUserDialogComponent, {data: usuario, width: '500px'});
  }

  closeDialog() {
    this.MatDialog.closeAll();
  }

}
