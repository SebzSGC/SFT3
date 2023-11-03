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
exports.ActualizarProducto = exports.EliminarProducto = exports.CrearProducto = exports.ListarProducto = exports.ListarProductos = void 0;
const connection_1 = __importDefault(require("../connection/connection"));
const ListarProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = "SELECT * FROM producto";
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
exports.ListarProductos = ListarProductos;
function ListarProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `SELECT * FROM Producto WHERE id = ${id}`;
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
}
exports.ListarProducto = ListarProducto;
;
function CrearProducto(producto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO Producto(Nombre, Stock, Precio, Descripcion) VALUES('${producto.Nombre}', ${producto.Stock}, ${producto.Precio}, '${producto.Descripcion}')`;
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
exports.CrearProducto = CrearProducto;
;
function EliminarProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `DELETE FROM Producto WHERE id = ${id}`;
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
exports.EliminarProducto = EliminarProducto;
;
function ActualizarProducto(id, producto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `UPDATE Producto SET Nombre = '${producto.Nombre}', Stock = ${producto.Stock}, Precio = ${producto.Precio}, Descripcion = '${producto.Descripcion}' WHERE id = ${id}`;
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
exports.ActualizarProducto = ActualizarProducto;
