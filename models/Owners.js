import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const Owners = sequelize.define('Owners', {
  OwnerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ContactDetails: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Owners;
