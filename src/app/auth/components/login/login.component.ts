import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm = this.formBuidler.group({
    Correo: ['', [Validators.required, Validators.email]],
    Contrasena: ['', [Validators.required]],
  });

  constructor(
    private formBuidler: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.LoginForm.valid) {
      this.apiService
        .getUsuario(this.LoginForm.value.Correo as string, this.LoginForm.value.Contrasena as string)
        .subscribe({
          next: (response) => {
            if (response.length > 0) {
              this.router.navigateByUrl('/inicio');
              this.LoginForm.reset();
              this.toastr.success('Hola!', 'Inicio de sesión exitoso');
            } else {
              this.toastr.error('Correo/Contraseña incorrectos', 'Error');
            }
          },
          error: (error) => {
            this.toastr.error('Algo ha salido mal, intentalo de nuevo', error);
          }
        });
    } else {
      this.LoginForm.markAllAsTouched();
      this.toastr.warning('Revisa los campos', 'Formulario inválido');
    }
  }
  
  

  get Correo() {
    return this.LoginForm.controls.Correo;
  }

  get Contrasena() {
    return this.LoginForm.controls.Contrasena;
  }
}
