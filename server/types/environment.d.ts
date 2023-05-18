import { Dialect } from "sequelize/types/sequelize";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      DB_USER: string;
      DB_NAME: string;
      DB_PASS: string;
      DB_CONNECTION: Dialect;
      ENV: "test" | "dev" | "prod";
    }
  }
}
