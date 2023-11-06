import express from 'express';
import usuariosRouter from './routes/usuarios.routes';
import productosRouter from './routes/productos.routes';
import carritoRouter from './routes/carrito.routes';
import dashBoardRouter from './routes/dashBoard.routes';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api', productosRouter);
app.use('/api', usuariosRouter);
app.use('/api', carritoRouter);
app.use('/api', dashBoardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
