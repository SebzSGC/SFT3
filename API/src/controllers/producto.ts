import { Producto } from '../model/productos';
import * as serviceProducto from '../services/producto';

export const GetProductos = async (): Promise<Producto[]> => {
    try {
        let data: Producto[] = await serviceProducto.ListarProductos();
        return data;
    } catch (error) {
        throw error;
    }
};

export const GetProducto = async (id: number): Promise<Producto[]> => {
    try {
        let data: Producto[] = await serviceProducto.ListarProducto(id);
        return data;
    } catch (error) {
        throw error;
    }
};

export const PostProducto = async (producto: Producto): Promise<boolean> => {
    try {
        return serviceProducto.CrearProducto(producto);
    } catch (error) {
        throw error;
    }
};

export const DeleteProducto = async (id: number): Promise<boolean> => {
    try {
        return serviceProducto.EliminarProducto(id);
    } catch (error) {
        throw error;
    }
};

export const ActualizarProducto = async (producto: Producto): Promise<boolean> => {
    try {
        return serviceProducto.ActualizarProducto(producto);
    } catch (error) {
        throw error;
    }
};