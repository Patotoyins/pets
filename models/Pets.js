import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';
import Owners from './Owners';
import Species from './Species';
import Breeds from './Breeds';

const Pets = sequelize.define('Pets', {
  PetID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  DateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  OwnerID: {
    type: DataTypes.INTEGER,
    references: {
      model: Owners,
      key: 'OwnerID',
    },
  },
  SpeciesID: {
    type: DataTypes.INTEGER,
    references: {
      model: Species,
      key: 'SpeciesID',
    },
  },
  BreedID: {
    type: DataTypes.INTEGER,
    references: {
      model: Breeds,
      key: 'BreedID',
    },
  },
});

export default Pets;
