import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { CarritoService } from 'src/app/service/Carrito/carrito.service';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  isLoginIn: boolean = false;
  userData?: Usuario | null;
  counItemsCart:number = 0;

  constructor(private usuarioService: UsuarioService, private carritoService: CarritoService) {

    this.carritoService.TotalItems.subscribe((totalItems) => {
      this.counItemsCart = totalItems;
    })

    this.usuarioService.userData.subscribe((userData) => {
      this.userData = userData;
    })

  }

  ngOnInit(): void {
    this.usuarioService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoginIn = isLoggedIn;
      },
    });
    this.usuarioService.userData.subscribe({
      next: (userData) => {
        if(userData != null){
          this.userData = userData;
        }    
      },
    });
  }

  logOut(){
    this.usuarioService.currentLoginOn.next(false);
    this.usuarioService.currentUserData.next(null);
  }
}
