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
exports.ActualizarUsuario = exports.EliminarUsuario = exports.CrearUsuario = exports.EncontrarUsuario = exports.ListarUsuarios = void 0;
const connection_1 = __importDefault(require("../connection/connection"));
const ListarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = "SELECT * FROM Usuario";
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
exports.ListarUsuarios = ListarUsuarios;
function EncontrarUsuario(correo, contrasena) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `SELECT * FROM Usuario WHERE Correo = '${correo}' AND Contrasena = '${contrasena}'`;
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
exports.EncontrarUsuario = EncontrarUsuario;
;
function CrearUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO Usuario(Nombre, Cedula, Cargo, Correo, Contrasena) VALUES('${usuario.Nombre}', '${usuario.Cedula}', '${usuario.Cargo}', '${usuario.Correo}', '${usuario.Contrasena}')`;
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
exports.CrearUsuario = CrearUsuario;
;
function EliminarUsuario(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `DELETE FROM Usuario WHERE id = ${id}`;
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
exports.EliminarUsuario = EliminarUsuario;
;
function ActualizarUsuario(id, usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = `UPDATE Usuario SET Nombre = '${usuario.Nombre}', Cedula = '${usuario.Cedula}', Cargo = '${usuario.Cargo}', Correo = '${usuario.Correo}', Contrasena = '${usuario.Contrasena}' WHERE id = ${id}`;
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
exports.ActualizarUsuario = ActualizarUsuario;
