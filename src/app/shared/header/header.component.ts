import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { ApiService } from 'src/app/service/api.service';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  isLoginIn: boolean = false;
  userData?: Usuario | null;
  counItemsCart:number = 0;

  constructor(private apiService: ApiService, private carritoService: CarritoService) {

    this.carritoService.TotalItems.subscribe((totalItems) => {
      this.counItemsCart = totalItems;
    })

    this.apiService.userData.subscribe((userData) => {
      this.userData = userData;
    })

  }

  ngOnInit(): void {
    this.apiService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoginIn = isLoggedIn;
      },
    });
    this.apiService.userData.subscribe({
      next: (userData) => {
        if(userData != null){
          this.userData = userData;
        }    
      },
    });
  }

  logOut(){
    this.apiService.currentLoginOn.next(false);
    this.apiService.currentUserData.next(null);
  }
}
