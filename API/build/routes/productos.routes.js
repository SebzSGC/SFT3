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
const productosController = __importStar(require("../controllers/producto"));
const router = express_1.default.Router();
router.get("/productos", (_, res) => {
    productosController
        .GetProductos()
        .then((data) => {
        res.json(data);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.get("/productos/:id", (req, res) => {
    productosController
        .GetProducto(parseInt(req.params.id))
        .then((newdata) => {
        if (newdata.length == 0)
            res.status(404).send();
        else
            res.json(newdata);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.post("/productos", (req, res) => {
    productosController
        .PostProducto(req.body)
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
router.delete("/productos/:id", (req, res) => {
    productosController
        .DeleteProducto(parseInt(req.params.id))
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
router.put("/productos/:id", (req, res) => {
    productosController
        .ActualizarProducto(parseInt(req.params.id), req.body)
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
