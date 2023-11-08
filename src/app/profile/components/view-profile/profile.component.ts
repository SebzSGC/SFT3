import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Models/usuario.model';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario: Usuario | null = null;
  RegisterForm : any;

  constructor(
    private formBuidler: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.usuarioService.userData.subscribe((data) => {
      this.usuario = data;
    });

    this.RegisterForm = this.formBuidler.group({
      Id: [this.usuario?.Id],
      Nombre: [this.usuario?.Nombre, [Validators.required, Validators.minLength(8)]],
      Cedula: [this.usuario?.Cedula, [Validators.required]],
      Cargo: [this.usuario?.Cargo, [Validators.required]],
      Correo: [this.usuario?.Correo, [Validators.required, Validators.email]],
      Contrasena: [this.usuario?.Contrasena, [Validators.required, Validators.minLength(6)]],
    });

  }

  get Nombre() {
    return this.RegisterForm.controls.Nombre;
  }

  get Cedula() {
    return this.RegisterForm.controls.Cedula;
  }

  get Correo() {
    return this.RegisterForm.controls.Correo;
  }

  get Contrasena() {
    return this.RegisterForm.controls.Contrasena;
  }

  updateUser() {
    if (this.RegisterForm.valid) {
      this.usuarioService
        .editUsuario(this.RegisterForm.value as Usuario)
        .subscribe({
          next: (response) => {
            if (response) {
              this.RegisterForm.markAllAsTouched();
              this.toastr.success('Tu usuario ha sido actualizado!', 'Completado');
            } else {
              this.toastr.error('No se pudo editar el usuario', 'Error');
            }
          },
          error: (error) => {
            this.toastr.error('Algo ha salido mal, intentalo de nuevo', error);
          }
        });
    } else {
      this.RegisterForm.markAllAsTouched();
      this.toastr.warning('Revisa los campos', 'Formulario inválido');
    }
  }
}
