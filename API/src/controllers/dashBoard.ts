import { VentasProducto } from '../model/dashBoard';
import * as dashBoardProducto from '../services/dashboard';

export const GetVentasHechas = async (): Promise<VentasProducto[]> => {
    try {
        let data: VentasProducto[] = await dashBoardProducto.VerVentas();
        return data;
    } catch (error) {
        throw error;
    }
};