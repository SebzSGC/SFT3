import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {
  formatPrecio(precio: number): string {
    return precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  }
}
