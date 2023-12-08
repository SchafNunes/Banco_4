import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config";

const Cliente = sequelize.define('cliente', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endereco: {
    type: Sequelize.STRING
  },
  cidade: {
    type: Sequelize.STRING
  },
  uf: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});


export default Cliente;