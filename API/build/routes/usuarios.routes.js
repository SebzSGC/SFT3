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
const usuarioController = __importStar(require("../controllers/usuario"));
const router = express_1.default.Router();
router.get('/usuarios', (_, res) => {
    usuarioController
        .GetUsuarios()
        .then((data) => {
        res.json(data);
    }).catch((e) => {
        res.status(500).json(e);
    });
});
router.get("/usuarios/:correo/:contrasena", (req, res) => {
    usuarioController
        .GetUsuario(req.params.correo, req.params.contrasena)
        .then((newdata) => {
        res.json(newdata);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.post("/usuarios", (req, res) => {
    usuarioController
        .PostUsuario(req.body)
        .then((newdata) => {
        if (newdata)
            res.status(201).send(true);
        else
            res.status(500).send(false);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.delete("/usuarios/:id", (req, res) => {
    usuarioController
        .DeleteUsuario(parseInt(req.params.id))
        .then((newdata) => {
        if (newdata)
            res.status(200).send(true);
        else
            res.status(404).send(false);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
router.put("/usuarios/:id", (req, res) => {
    usuarioController
        .ActualizarUsuario(parseInt(req.params.id), req.body)
        .then((newdata) => {
        if (newdata)
            res.status(200).send(true);
        else
            res.status(404).send(false);
    })
        .catch((e) => {
        res.status(500).json(e);
    });
});
exports.default = router;
