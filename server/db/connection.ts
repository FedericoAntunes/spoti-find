import * as dotenv from "dotenv";
dotenv.config();
import { Dialect, Sequelize } from "sequelize";

const sequelizeOptions = {
  dialect: process.env.DB_CONNECTION as Dialect,
  logging: false,
};

export const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  sequelizeOptions
);

/* const dbSync = async () => {
  await sequelize.sync({ force: true });
  console.log("[Database] ¡La estructura de tablas fue actualizada!");
};
dbSync(); */

export default sequelize;
