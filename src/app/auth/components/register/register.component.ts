import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Models/usuario.model';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  RegisterForm = this.formBuidler.group({
    Nombre: ['', [Validators.required, Validators.minLength(8)]],
    Cedula: ['', [Validators.required]],
    Cargo: ['CLIENTE', [Validators.required]],
    Correo: ['', [Validators.required, Validators.email]],
    Contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuidler: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.RegisterForm.valid) {
      this.usuarioService
        .createUsuario(this.RegisterForm.value as Usuario)
        .subscribe({
          next: (response) => {
            if (response) {
              this.router.navigateByUrl('/auth');
              this.RegisterForm.reset();
              this.toastr.success('Inicia sesion!', 'Registro completado');
            } else {
              this.toastr.error('No se pudo crear el usuario', 'Error');
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
}
