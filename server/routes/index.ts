import { Express } from "express";

import publicRoutes from "./publicRoutes";

export default (app: Express) => {
  app.use("/", publicRoutes);
};
