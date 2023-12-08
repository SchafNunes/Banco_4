import { DataTypes, Sequelize } from "sequelize";

import { sequelize } from "../config";

const Compras = sequelize.define('compras', {
  codigo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  produto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  },
  id_cliente: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

export default Compras;