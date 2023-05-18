import { Request, Response } from "express";

export async function index(_req: Request, res: Response) {
  res.json("# Welcome to SpotiSearch");
}
