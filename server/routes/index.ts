import { Express } from "express";

import publicRoutes from "./publicRoutes";
import authRoutes from "./authRoutes";
import queryRoutes from "./queryRoutes";

export default (app: Express) => {
  app.use("/", publicRoutes);
  app.use("/auth", authRoutes);
  app.use("/search", queryRoutes);
};
