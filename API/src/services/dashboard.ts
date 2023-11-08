import GetConnection from "../connection/connection";
import { VentasProducto } from "../model/dashBoard";

export const VerVentas = async (): Promise<VentasProducto[]> => {
    try {
      let query = "SELECT * FROM VentasHechas";
      const statusConnection = await GetConnection();
      let response = await statusConnection.query<VentasProducto>(query);
      if (response != undefined) {
        return response.recordset;
      }
      return [];
    } catch (error) {
      throw error;
    }
  };