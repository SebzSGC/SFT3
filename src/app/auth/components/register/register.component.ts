import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Models/usuario.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  RegisterForm = this.formBuidler.group({
    Nombre: ['', [Validators.required, Validators.minLength(8)]],
    Cedula: ['', [Validators.required]],
    Cargo: ['cliente', [Validators.required]],
    Correo: ['', [Validators.required, Validators.email]],
    Contrasena: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuidler: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.RegisterForm.valid) {
      this.apiService
        .createUsuario(this.RegisterForm.value as Usuario)
        .subscribe((response) => {
          if (response) {
            this.router.navigateByUrl('/auth/login');
            this.RegisterForm.reset();
            this.toastr.success('Usuario creado', 'Inicia sesion');
          } else {
            this.toastr.error('Algo ha fallado, vuelvelo a intentar', 'Error');
          }
        });
    } else {
      this.RegisterForm.markAllAsTouched();
      this.toastr.warning('Revisa los campos', 'Formulario invalido');
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
