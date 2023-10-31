import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoginIn: boolean = false;
  userData?: Usuario;
  constructor(private apiService: ApiService) {}

  ngOnDestroy(): void {
    this.apiService.currentLoginOn.unsubscribe();
    this.apiService.currentUserData.unsubscribe();
  }

  ngOnInit(): void {
    this.apiService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoginIn = isLoggedIn;
      },
    });
    this.apiService.userData.subscribe({
      next: (userData) => {
        this.userData = userData;
      },
    });
  }

  logOut(){
    this.apiService.currentLoginOn.next(false);
    this.apiService.currentUserData.next({
      Nombre: '',
      Cedula: '',
      Cargo: '',
      Correo: '',
      Contrasena: '',
    });
  }
}
