import clienteControler from "../controllers/clienteControler";

export default (app) => {
  app.post('/cliente', clienteControler.create);
  app.get('/cliente', clienteControler.get);
  app.get('/cliente/:id', clienteControler.get);
  app.get('/cliente/redis/:id', clienteControler.getClienteRedis);
  // app.put('/cliente/:id', clienteControler.update);
  // app.delete('/cliente/:id', clienteControler.delete);



}