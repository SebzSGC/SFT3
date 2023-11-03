"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const productos_routes_1 = __importDefault(require("./routes/productos.routes"));
const carrito_routes_1 = __importDefault(require("./routes/carrito.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api', productos_routes_1.default);
app.use('/api', usuarios_routes_1.default);
app.use('/api', carrito_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
