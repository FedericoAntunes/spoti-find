// Calls
import { SpotifySearchCall } from '../axios_calls/spotifyCalls'

// Types
import { Request, Response } from 'express'

export async function getArtists(req: Request, res: Response) {
  const { token, offset } = req.body

  try {
    const baseArtists = await SpotifySearchCall.getArtist(
      `/search?q=year:1980-2023&type=artist&offset=${offset ? offset : 0}`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    )
    res.json(baseArtists)
  } catch (error) {
    res.json(error)
  }
}

export async function getArtistByGenre(req: Request, res: Response) {
  const { token, genre, offset } = req.body

  try {
    const filteredArtists = await SpotifySearchCall.getArtist(
      `/search?q=genre:${genre}&type=artist&offset=${offset ? offset : 0}`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    )
    res.json(filteredArtists)
  } catch (error) {
    res.json(error)
  }
}
