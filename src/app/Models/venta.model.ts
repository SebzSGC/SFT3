import { Producto } from "./producto.model";
import { Usuario } from "./usuario.model";

export interface Venta{
    Usuario: Usuario;
    Fecha_Pago: Date;
    Total_Pagado: number;
}

export interface DetalleVenta extends Venta{
    Venta: Venta;
    Producto: Producto;
    Cantidad_Producto: number;
}