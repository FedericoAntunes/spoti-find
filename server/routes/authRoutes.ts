import express from "express";
import { index } from "../controllers/authController";

const router = express.Router();

router.get("/", index);

export default router;
