import Cliente  from './Cliente';
import Compras from './Compras';



(async () => {
    await Compras.sync({ force: true });  
    await Cliente.sync({ force: true });  
})();

