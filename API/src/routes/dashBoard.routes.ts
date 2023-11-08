import express from 'express';
import * as dashBoardController from '../controllers/dashBoard';

const router = express.Router();

router.get("/dashboard/ventas", (_, res) => {
    dashBoardController
      .GetVentasHechas()
      .then((data) => {
        res.json(data);
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  });

  export default router;
