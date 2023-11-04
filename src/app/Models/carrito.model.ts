export interface Carrito{
    Id_Usuario?: number;
    Id_Producto?: number;
    Fecha_Creacion?: Date;
    Cantidad_Producto: number;
}

export interface CarritoFront{
    Id: number;
    Stock: number;
    Nombre: string;
    Precio: number;
    Cantidad: number;
    Subtotal: number;
}