import Cliente from './Cliente';
import Compras from './Compras';


Cliente.hasMany(Compras, { foreignKey: 'id_cliente' });
Compras.belongsTo(Cliente, { foreignKey: 'id_cliente' });

export { Cliente, Compras };

