import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';
import Species from './Species';

const Breeds = sequelize.define('Breeds', {
  BreedID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  BreedName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  SpeciesID: {
    type: DataTypes.INTEGER,
    references: {
      model: Species,
      key: 'SpeciesID',
    },
  },
});

export default Breeds;
