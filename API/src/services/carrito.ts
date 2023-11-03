import GetConnection from "../connection/connection";
import { Carrito, CarritoFront } from "../model/carrito";

export const MostrarCarritoData = async (id: number): Promise<Carrito[]> => {
  try {
    let query = `SELECT * FROM Carrito WHERE Id_Usuario = ${id}`;
    const statusConnection = await GetConnection();
    let response = await statusConnection.query<Carrito[]>(query);
    if (response != undefined) {
      return response.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export const MostrarCarrito = async (id: number): Promise<CarritoFront[]> => {
    try {
      let query = `EXEC ObtenerDetalleCarrito ${id}`;
      const statusConnection = await GetConnection();
      let response = await statusConnection.query<CarritoFront[]>(query);
      if (response != undefined) {
        return response.recordset;
      }
      return [];
    } catch (error) {
      throw error;
    }
  };

  export async function agregarProductoAlCarrito(carrito: Carrito): Promise<boolean> {
    try {
      const query = `EXEC AgregarProductoAlCarrito ${carrito.Id_Usuario}, ${carrito.Id_Producto}, ${carrito.Cantidad_Producto}`;  
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
  

  export async function EliminarProductoDelCarrito(Id_Producto:number): Promise<boolean> {
    try {
      let query = `DELETE FROM Carrito WHERE Id_Producto = ${Id_Producto}`;
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

  export async function TotalDeProductos(Id_Usuario: number): Promise<number>{
    try {
      let query = `SELECT COUNT(Id_Producto) as TotalProductos FROM Carrito WHERE Id_Usuario = ${Id_Usuario}`;
      const statusConnection = await GetConnection();
      const response = await statusConnection.query(query);
      if (response.recordset[0].TotalProductos > 0) {
        return response.recordset[0].TotalProductos;
      }else{
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

  export async function TotalAPagar(Id_Usuario: number): Promise<number>{
    try {
      let query = `EXEC TotalAPagar ${Id_Usuario}`;
      const statusConnection = await GetConnection();
      const response = await statusConnection.query(query);
        return response.recordset[0].TotalApagar;
    } catch (error) {
      throw error;
    }
  }

  export async function finalizarCompra(): Promise<boolean> {
    try {
      let query = `EXEC CompraRealizada`;
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

  export async function ActualizarCantidadProductoEnCarrito(Id_Producto: number, Cantidad_Producto: number): Promise<boolean> {
    try {
      const query = `UPDATE Carrito SET Cantidad = ${Cantidad_Producto} WHERE Id_Producto = ${Id_Producto}`;
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