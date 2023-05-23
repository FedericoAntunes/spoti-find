// Calls
import { SpotifySearchCall } from '../axios_calls/spotifyCalls'

// Types
import { Request, Response } from 'express'

export async function getTracks(req: Request, res: Response) {
  const { token } = req.body

  try {
    const baseTracks = await SpotifySearchCall.getTracks(
      '/search?q=year:1960-2023&type=track',
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    )
    res.json(baseTracks)
  } catch (error) {
    res.json(error)
  }
}

export async function getFilteredTracks(req: Request, res: Response) {
  const { token, year_range } = req.body

  try {
    const filteredByYearTracks = await SpotifySearchCall.getTracks(
      `/search?q=year:${year_range}&type=track`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    )
    res.json(filteredByYearTracks)
  } catch (error) {
    res.json(error)
  }
}
