import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { VentasService } from 'src/app/service/DashBoard/ventas.service';
import { VentasProducto } from 'src/app/Models/dashBoard';
import { SharedFunctionsService } from 'src/app/service/shared-functions.service';
import { UsuarioService } from 'src/app/service/Usuario/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  ventas: VentasProducto[] = []
  DineroGanado: number = 0
  TotalVentas: number = 0
  countEmployee: number = 0;
  countClient: number = 0;
  constructor(
    private ventasService: VentasService,
    private sharedFunctions: SharedFunctionsService,
    private usuarioService: UsuarioService
  ){
    this.getVentas()
  }
  //grafico de barras
  // barData = [
  //   {
  //     name: 'Lunes',
  //     value: 15339
  //   },
  //   {
  //     name: 'Martes',
  //     value: 21345
  //   },
  //   {
  //     name: 'Miercoles',
  //     value: 18483
  //   },
  //   {
  //     name: 'Jueves',
  //     value: 50240
  //   },
  //   {
  //     name: 'Viernes',
  //     value: 80231
  //   },
  //   {
  //     name: 'Sabado',
  //     value: 50000
  //   },
  //   {
  //     name: 'Domingo',
  //     value: 25000
  //   },
  //   // ...
  // ];

  // colorScheme: Color = {
  //   domain: ['#007bff'],
  //   name: 'custom',
  //   selectable: true,
  //   group: ScaleType.Ordinal
  // };
  lineChartData = [
    {
      name: 'Series 1',
      series: [
        { name: 'Lunes', value: 15339 },
        { name: 'Martes', value: 21345 },
        { name: 'Miércoles', value: 18483 },
        { name: 'Jueves', value: 24003 },
        { name: 'Viernes', value: 5000 },
        { name: 'Sábado', value: 24092 },
        { name: 'Domingo', value: 12034 }
      ]
    }
  ];

  colorScheme: Color = {
      domain: ['#007bff'],
      name: 'custom',
      selectable: true,
      group: ScaleType.Ordinal
    };

    getVentas(){
      this.ventasService.getVentasDashBoard().subscribe((data)=>{
        this.ventas = data
        this.getValueVentas(data)
        this.getTotalVentas(data)
      })
      this.usuarioService.getUsuarios().subscribe((data) => {
        this.countClient = data.filter((a) => a.Cargo === 'CLIENTE').length;
        this.countEmployee = data.filter((a) => a.Cargo === 'EMPLEADO').length;
      });  
    }

    formatPrecio(precio: number): string {
      return this.sharedFunctions.formatPrecio(precio);
    }

    getValueVentas(ventas: VentasProducto[]): void{
      this.DineroGanado = ventas.reduce((a, b) => a + b.TotalGanado, 0)
    }

    getTotalVentas(ventas: VentasProducto[]): void{
      this.TotalVentas = ventas.reduce((a, b) => a + b.Ventas, 0)
    }
}
