import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

class QueryData extends Model {
  declare id: number;
  declare ip: string;
  declare artist: string;
  declare query: string;
}

QueryData.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "queryData",
  }
);

export default QueryData;
