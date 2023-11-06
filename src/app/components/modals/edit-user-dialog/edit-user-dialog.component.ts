import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Models/usuario.model';
import { DialogService } from 'src/app/service/dialog.service';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  EditForm = this.formBuidler.group({
    Id:[this.usuario.Id],
    Nombre: [this.usuario.Nombre, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    Cedula: [this.usuario.Cedula, [Validators.required]],
    Cargo: [this.usuario.Cargo, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    Correo: [this.usuario.Correo, [Validators.required, Validators.email]],
    Contrasena: [this.usuario.Contrasena, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    private editUserDialog: DialogService,
    private formBuidler: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ){}

  close(): void {
    this.editUserDialog.closeDialog();
  }

  sendUsuario(){
    if (this.EditForm.valid) {
      this.usuarioService
        .editUsuario(this.EditForm.value as Usuario)
        .subscribe({
          next: (response) => {
            if (response) {
              this.toastr.success('Usuario editado', 'Completado');
              this.editUserDialog.closeDialog();
            } else {
              this.toastr.error('No se pudo editar el usuario', 'Error');
              this.editUserDialog.closeDialog();
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

  get Cedula() {
    return this.EditForm.controls.Cedula;
  }

  get Cargo() {
    return this.EditForm.controls.Cargo;
  }

  get Correo() {
    return this.EditForm.controls.Correo;
  }

  get Contrasena() {
    return this.EditForm.controls.Contrasena;
  }
}
