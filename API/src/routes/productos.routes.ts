import express from "express";
import * as productosController from "../controllers/producto";
import { Producto } from "../model/productos";

const router = express.Router();

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

router.get("/productos/:id", (req: express.Request, res: express.Response) => {
  productosController
    .GetProducto(parseInt(req.params.id))
    .then((newdata) => {
      if(newdata.length == 0) res.status(404).send();
        else res.json(newdata);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
      
});

router.post("/productos", (req: express.Request, res: express.Response) => {
  productosController
    .PostProducto(req.body as Producto)
    .then((newdata) => {
      if (newdata) res.status(201).send();
      else res.status(500).send();
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.delete("/productos/:id", (req: express.Request, res: express.Response) => {
  productosController
    .DeleteProducto(parseInt(req.params.id))
    .then((newdata) => {
      if(newdata)
      res.status(200).send();
         else res.status(404).send();
      })
      .catch((e) => {
        res.status(500).json(e);
      });
      
});

router.put("/productos/:id", (req: express.Request, res: express.Response) => {
  productosController
    .ActualizarProducto(parseInt(req.params.id), req.body as Producto)
    .then((newdata) => {
      if(newdata)
      res.status(200).send();
         else res.status(404).send();
      })
      .catch((e) => {
        res.status(500).json(e);
      });
});

export default router;
