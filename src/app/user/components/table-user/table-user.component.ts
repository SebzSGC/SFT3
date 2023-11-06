import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario.model';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';
import { DialogService } from 'src/app/service/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css'],
})
export class TableUserComponent implements OnInit {
  
  dataUsers: Usuario[];
  sortData: BehaviorSubject<Usuario[]>;
  showData: Usuario[];
  userSelected: any;
  
  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private dialogService: DialogService) {
    this.dataUsers = [];
    this.sortData = new BehaviorSubject<Usuario[]>([]);
    this.showData = [];

    this.sortData.subscribe(data => {
      this.showData = data;
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.dataUsers = data;
      this.sortData.next(this.dataUsers);
    });  
  }

  sortEmployee() {
    this.showData = this.dataUsers 
    this.showData = this.showData.filter((a) => a.Cargo === 'EMPLEADO');
  }

  sortClient(){
    this.showData = this.dataUsers 
    this.showData = this.showData.filter((a) => a.Cargo === 'CLIENTE');
  }

  sortAdmin(){
    this.showData = this.dataUsers 
    this.showData = this.showData.filter((a) => a.Cargo === 'ADMINISTRADOR');
  }

  resetSort(){
    this.getUsers();
  }
  
  selectedRow(usuario: Usuario){
    this.userSelected= usuario;
    this.toastr.info(`Usuario seleccionado: ${this.userSelected.Nombre}`, 'Información');
  }

  delete() {
    if(!this.userSelected){
      this.toastr.warning('Selecciona un usuario', 'Advertencia');
      return;
    }
    this.usuarioService.deleteUsuario(this.userSelected.Id).subscribe({
      next: (data) => {
        if (data) {
          this.getUsers();
          this.toastr.success('Usuario eliminado', 'Completado');
        } else {
          this.toastr.error('No se pudo eliminar el usuario', 'Error');
        }
      },
      error: (error) => {
        this.toastr.error('Ocurrió un error al eliminar el usuario', 'Error');
      }
    });
  }

  editDialog() {
    if(!this.userSelected){
      this.toastr.warning('Selecciona un usuario', 'Advertencia');
      return;
    }
    this.dialogService.openEditUserDialog(this.userSelected);
  }
}
