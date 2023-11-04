import express from "express";
import * as carritoController from "../controllers/carrito";
import { Carrito } from "../model/carrito";

const router = express.Router();

router.get("/carrito/:id", (req: express.Request, res) => {
  carritoController
    .GetCarritoData(parseInt(req.params.id))
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.get("/carrito/front/:id", (req: express.Request, res) => {
  carritoController
    .GetCarrito(parseInt(req.params.id))
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.get("/carrito/chk/:id", (req: express.Request, res) => {
  carritoController
    .getTotalToPay(parseInt(req.params.id))
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.get("/carrito/productos/total/:id", (req: express.Request, res: express.Response) => {
  carritoController
    .getTotalProductsFromCarrito(parseInt(req.params.id))
    .then((newdata) => {
      res.status(200).json(newdata);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
});

router.post("/carrito", (req: express.Request, res: express.Response) => {
  carritoController
    .PostCarrito(req.body as Carrito)
    .then((newdata) => {
      if (newdata) res.status(201).send();
      else res.status(500).send();
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.post("/carrito/cerrar", (req: express.Request, res) => {
  carritoController
    .closeCart(parseInt(req.body.Id_Usuario))
    .then((newdata) => {
      if(newdata)
      res.status(200).send(true);
         else res.status(500).send(false);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
});

router.delete("/carrito/:id", (req: express.Request, res: express.Response) => {
  carritoController
    .DeleteProductFromCarrito(parseInt(req.params.id))
    .then((newdata) => {
      if(newdata)
      res.status(200).send();
         else res.status(404).send();
      })
      .catch((e) => {
        res.status(500).json(e);
      });
      
});

router.put("/carrito", (req: express.Request, res: express.Response) => {
  carritoController
    .UpdateUnitProductFromCarrito(req.body.Id_Producto, req.body.cantidad)
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
