import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedFunctionsService {
  private eventBus: Subject<any> = new Subject<any>();

  emit(event: string, data: any) {
    this.eventBus.next({ name: event, data: data });
  }

  on(event: string, callback: (data: any) => void) {
    this.eventBus.subscribe((e) => {
      if (e.name === event) {
        callback(e.data);
      }
    });
  }
  formatPrecio(precio: number): string {
    return precio.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
  }
}
