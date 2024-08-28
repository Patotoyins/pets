import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const Species = sequelize.define('Species', {
  SpeciesID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  SpeciesName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Species;
