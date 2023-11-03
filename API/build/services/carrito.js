"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarCantidadProductoEnCarrito = exports.finalizarCompra = exports.TotalAPagar = exports.TotalDeProductos = exports.EliminarProductoDelCarrito = exports.agregarProductoAlCarrito = exports.MostrarCarrito = void 0;
const connection_1 = __importDefault(require("../connection/connection"));
const MostrarCarrito = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = `EXEC ObtenerDetalleCarrito ${id}`;
        const statusConnection = yield (0, connection_1.default)();
        let response = yield statusConnection.query(query);
        if (response != undefined) {
            return response.recordset;
        }
        return [];
    }
    catch (error) {
        throw error;
    }
});
exports.MostrarCarrito = MostrarCarrito;
function agregarProductoAlCarrito(carrito) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `EXEC AgregarProductoAlCarrito ${carrito.Id_Usuario}, ${carrito.Id_Producto}, ${carrito.Cantidad_Producto}`;
            const statusConnection = yield (0, connection_1.default)();
            const response = yield statusConnection.query(query);
            if (response != undefined) {
                return response.rowsAffected.length > 0;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.agregarProductoAlCarrito = agregarProductoAlCarrito;
;
function EliminarProductoDelCarrito(Id_Producto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `DELETE FROM Carrito WHERE Id_Producto = ${Id_Producto}`;
            const statusConnection = yield (0, connection_1.default)();
            const response = yield statusConnection.query(query);
            if (response != undefined) {
                return response.rowsAffected.length > 0;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.EliminarProductoDelCarrito = EliminarProductoDelCarrito;
;
function TotalDeProductos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `SELECT SUM(Cantidad) as TotalProductos FROM Carrito`;
            console.log(query);
            const statusConnection = yield (0, connection_1.default)();
            const response = yield statusConnection.query(query);
            console.log(response.recordset[0].TotalProductos);
            if (response.recordset[0].TotalProductos > 0) {
                return response.recordset[0].TotalProductos;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.TotalDeProductos = TotalDeProductos;
function TotalAPagar(Id_Usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `EXEC TotalAPagar ${Id_Usuario}`;
            const statusConnection = yield (0, connection_1.default)();
            const response = yield statusConnection.query(query);
            return response.recordset[0].TotalApagar;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.TotalAPagar = TotalAPagar;
function finalizarCompra() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `EXEC CompraRealizada`;
            const statusConnection = yield (0, connection_1.default)();
            const response = yield statusConnection.query(query);
            if (response != undefined) {
                return response.rowsAffected.length > 0;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.finalizarCompra = finalizarCompra;
;
function ActualizarCantidadProductoEnCarrito(Id_Producto, Cantidad_Producto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `UPDATE Carrito SET Cantidad = ${Cantidad_Producto} WHERE Id_Producto = ${Id_Producto}`;
            const statusConnection = yield (0, connection_1.default)();
            const response = yield statusConnection.query(query);
            if (response != undefined) {
                return response.rowsAffected.length > 0;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.ActualizarCantidadProductoEnCarrito = ActualizarCantidadProductoEnCarrito;
