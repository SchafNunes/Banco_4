import comprasController from "../controllers/comprasController";

export default (app) => {
  app.post('/compras', comprasController.create);
  app.get('/compras', comprasController.get);
  app.get('/compras/:id', comprasController.get);
  app.get('/compras/redis/:id', comprasController.getVendaRedis);
  // app.put('/compras/:id', comprasController.update);
  // app.delete('/compras/:id', comprasController.delete);
}