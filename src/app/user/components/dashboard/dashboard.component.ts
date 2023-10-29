import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

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
}
