import express from 'express';
import * as usuarioController from '../controllers/usuario';
import { Usuario } from '../model/usuarios';

const router = express.Router();

router.get('/usuarios', (_, res) => {
  usuarioController
  .GetUsuarios()
  .then((data) => {
    res.json(data);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.get("/usuarios/:correo/:contrasena", (req: express.Request, res: express.Response) => {
  usuarioController
    .GetUsuario(req.params.correo, req.params.contrasena)
    .then((newdata) => {
      res.json(newdata);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
      
});

router.post("/usuarios", (req: express.Request, res: express.Response) => {
  usuarioController
    .PostUsuario(req.body as Usuario)
    .then((newdata) => {
      if (newdata) res.status(201).send(true);
      else res.status(500).send(false);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.delete("/usuarios/:id", (req: express.Request, res: express.Response) => {
  usuarioController
    .DeleteUsuario(parseInt(req.params.id))
    .then((newdata) => {
      if(newdata)
      res.status(200).send(true);
         else res.status(404).send(false);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
      
});

router.put("/usuarios", (req: express.Request, res: express.Response) => {
  usuarioController
    .ActualizarUsuario(req.body as Usuario)
    .then((newdata) => {
      if(newdata)
      res.status(200).send(true);
         else res.status(404).send(false);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
});

export default router;
