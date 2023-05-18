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
      SPOTIFY_TOKEN_BASE_URL: string;
      SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
      SPOTIFY_SEARCH_URL: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
