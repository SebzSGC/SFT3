"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeCart = exports.getTotalProductsFromCarrito = exports.getTotalToPay = exports.UpdateUnitProductFromCarrito = exports.DeleteProductFromCarrito = exports.PostCarrito = exports.GetCarrito = void 0;
const serviceCarrito = __importStar(require("../services/carrito"));
const GetCarrito = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield serviceCarrito.MostrarCarrito(id);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.GetCarrito = GetCarrito;
const PostCarrito = (carrito) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return serviceCarrito.agregarProductoAlCarrito(carrito);
    }
    catch (error) {
        throw error;
    }
});
exports.PostCarrito = PostCarrito;
const DeleteProductFromCarrito = (Id_Producto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return serviceCarrito.EliminarProductoDelCarrito(Id_Producto);
    }
    catch (error) {
        throw error;
    }
});
exports.DeleteProductFromCarrito = DeleteProductFromCarrito;
const UpdateUnitProductFromCarrito = (Id_Producto, Cantidad_Producto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return serviceCarrito.ActualizarCantidadProductoEnCarrito(Id_Producto, Cantidad_Producto);
    }
    catch (error) {
        throw error;
    }
});
exports.UpdateUnitProductFromCarrito = UpdateUnitProductFromCarrito;
const getTotalToPay = (Id_Usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return serviceCarrito.TotalAPagar(Id_Usuario);
    }
    catch (error) {
        throw error;
    }
});
exports.getTotalToPay = getTotalToPay;
const getTotalProductsFromCarrito = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return serviceCarrito.TotalDeProductos();
    }
    catch (error) {
        throw error;
    }
});
exports.getTotalProductsFromCarrito = getTotalProductsFromCarrito;
const closeCart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return serviceCarrito.finalizarCompra();
    }
    catch (error) {
        throw error;
    }
});
exports.closeCart = closeCart;
