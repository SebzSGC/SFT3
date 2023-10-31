import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css'],
})
export class TableUserComponent implements OnInit {
  
  dataUsers: Usuario[];

  constructor(private apiService: ApiService) {
    this.dataUsers = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsuarios().subscribe((data) => {
      this.dataUsers = data;
    });  
  }
}
