// db.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import mailModel from "./mail.js";
import LineDataModel from "./LineData.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Unable to connect to PostgreSQL:', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Mails = mailModel(sequelize, Sequelize);
db.LineData = LineDataModel(sequelize, Sequelize);


export default db;
