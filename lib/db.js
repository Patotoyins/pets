import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('petDB', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
