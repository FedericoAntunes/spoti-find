import * as dotenv from 'dotenv'
dotenv.config()
import { /*  Dialect, Options, */ Sequelize } from 'sequelize'

/* const sequelizeOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION as Dialect,
  logging: false,
}

if (process.env.DB_CONNECTION === 'postgres') {
  sequelizeOptions.dialectModule = require('pg')
}

export const sequelize = new Sequelize(
  `${process.env.DB_DATABASE}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  sequelizeOptions
) */

export const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectModule: require('pg'),
    logging: false,
  }
)

/* const dbSync = async () => {
  await sequelize.sync({ force: true })
  console.log('[Database] ¡La estructura de tablas fue actualizada!')
}
dbSync() */

export default sequelize
