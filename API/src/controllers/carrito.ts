import { Carrito, CarritoFront } from "../model/carrito";
import * as serviceCarrito from '../services/carrito';

export const GetCarritoData = async (id: number): Promise<Carrito[]> => {
    try {
        let data: Carrito[] = await serviceCarrito.MostrarCarritoData(id);
        return data;
    } catch (error) {
        throw error;
    }
};

export const GetCarrito = async (id: number): Promise<CarritoFront[]> => {
    try {
        let data: CarritoFront[] = await serviceCarrito.MostrarCarrito(id);
        return data;
    } catch (error) {
        throw error;
    }
};

export const PostCarrito = async (carrito: Carrito): Promise<boolean> => {
    try {
        return serviceCarrito.agregarProductoAlCarrito(carrito);
    } catch (error) {
        throw error;
    }
};

export const DeleteProductFromCarrito = async (Id_Producto: number): Promise<boolean> => {
    try {
        return serviceCarrito.EliminarProductoDelCarrito(Id_Producto);
    } catch (error) {
        throw error;
    }
};

export const UpdateUnitProductFromCarrito = async (Id_Producto: number, Cantidad_Producto: number): Promise<boolean> => {
    try {
        return serviceCarrito.ActualizarCantidadProductoEnCarrito(Id_Producto, Cantidad_Producto);
    } catch (error) {
        throw error;
    }
};

export const getTotalToPay = async (Id_Usuario: number): Promise<number> => {
    try {
        return serviceCarrito.TotalAPagar(Id_Usuario);
    } catch (error) {
        throw error;
    }
};

export const getTotalProductsFromCarrito = async (Id_Usuario: number): Promise<number> => {
    try {
        return serviceCarrito.TotalDeProductos(Id_Usuario);
    } catch (error) {
        throw error;
    }
};

export const closeCart = async (Id_Usuario: number): Promise<boolean> => {
    try {
        return serviceCarrito.finalizarCompra(Id_Usuario);
    } catch (error) {
        throw error;
    }
};