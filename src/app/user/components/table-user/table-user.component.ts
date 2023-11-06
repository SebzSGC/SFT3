import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css'],
})
export class TableUserComponent implements OnInit {
  
  dataUsers: Usuario[];

  constructor(private usuarioService: UsuarioService) {
    this.dataUsers = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.dataUsers = data;
    });  
  }
}
