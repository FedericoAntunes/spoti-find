import { Request, Response } from "express";
import { TokenCall } from "../axios_calls/spotifyToken";

export async function index(_req: Request, res: Response) {
  try {
    const token = await TokenCall.getToken(
      `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}&limit=1`
    );
    res.json(token);
  } catch (error) {
    res.json(error);
  }
}
