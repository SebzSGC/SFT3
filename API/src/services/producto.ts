import GetConnection from "../connection/connection";
import { Producto } from "../model/productos";

export const ListarProductos = async (): Promise<Producto[]> => {
    try {
      let query = "SELECT * FROM producto";
      const statusConnection = await GetConnection();
      let response = await statusConnection.query<Producto>(query);
      if (response != undefined) {
        return response.recordset;
      }
      return [];
    } catch (error) {
      throw error;
    }
  };

  export async function ListarProducto(id:number): Promise<Producto[]> {
    try {
      let query = `SELECT * FROM Producto WHERE id = ${id}`;
      const statusConnection = await GetConnection();
      let response = await statusConnection.query(query);
      if (response != undefined) {
        return response.recordset;
      }
      return [];
    } catch (error) {
      throw error;
    }
  };

  export async function CrearProducto(producto: Producto): Promise<boolean> {
    try {
      const query = `INSERT INTO Producto(Nombre, Stock, Precio, Descripcion) VALUES('${producto.Nombre}', ${producto.Stock}, ${producto.Precio}, '${producto.Descripcion}')`;
      const statusConnection = await GetConnection();
      const response = await statusConnection.query(query);
      
      if (response != undefined) {
        return response.rowsAffected.length > 0;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };
  

  export async function EliminarProducto(id:number): Promise<boolean> {
    try {
      let query = `DELETE FROM Producto WHERE id = ${id}`;
      const statusConnection = await GetConnection();
      const response = await statusConnection.query(query);
      if (response != undefined) {
        return response.rowsAffected.length > 0;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  export async function ActualizarProducto(id: number, producto: Producto): Promise<boolean> {
    try {
        let query = `UPDATE Producto SET Nombre = '${producto.Nombre}', Stock = ${producto.Stock}, Precio = ${producto.Precio}, Descripcion = '${producto.Descripcion}' WHERE id = ${id}`;
        const statusConnection = await GetConnection();
        const response = await statusConnection.query(query);
        if (response != undefined) {
            return response.rowsAffected.length > 0;
        }
        return false;
    } catch (error) {
        throw error;
    }
}
