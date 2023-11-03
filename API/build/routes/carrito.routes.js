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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carritoController = __importStar(require("../controllers/carrito"));
const router = express_1.default.Router();
router.get("/carrito/:id", (req, res) => {
    carritoController
        .GetCarrito(parseInt(req.params.id))
        .then((data) => {
        res.json(data);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.get("/carrito/chk/:id", (req, res) => {
    carritoController
        .getTotalToPay(parseInt(req.params.id))
        .then((data) => {
        res.json(data);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.get("/carrito/total", (_req, res) => {
    console.log('hola');
    carritoController
        .getTotalProductsFromCarrito()
        .then((newdata) => {
        res.status(200).json(newdata);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.post("/carrito", (req, res) => {
    carritoController
        .PostCarrito(req.body)
        .then((newdata) => {
        if (newdata)
            res.status(201).send();
        else
            res.status(500).send();
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.post("/carrito/cerrar", (_req, res) => {
    carritoController
        .closeCart()
        .then((newdata) => {
        if (newdata)
            res.status(200).send();
        else
            res.status(500).send();
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.delete("/carrito/:id", (req, res) => {
    carritoController
        .DeleteProductFromCarrito(parseInt(req.params.id))
        .then((newdata) => {
        if (newdata)
            res.status(200).send();
        else
            res.status(404).send();
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.put("/carrito", (req, res) => {
    const cart = req.body;
    carritoController
        .UpdateUnitProductFromCarrito(cart.Id_Producto, cart.Cantidad_Producto)
        .then((newdata) => {
        if (newdata)
            res.status(200).send();
        else
            res.status(404).send();
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
exports.default = router;
