import express from "express";
import { index } from "../controllers/queryController";

const router = express.Router();

router.get("/", index);

export default router;
