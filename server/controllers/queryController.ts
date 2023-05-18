import { Request, Response } from 'express'
import { SpotifySearchCall } from '../axios_calls/spotifyCalls'

export async function index(req: Request, res: Response) {
  const { artist_name, token } = req.body

  try {
    const response = await SpotifySearchCall.getArtist(
      `/search?q=${artist_name}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const artistId = response.artists.items[0].id
    const albums = await SpotifySearchCall.getAlbums(
      `/artists/${artistId}/albums`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    res.json(albums)
  } catch (error) {
    res.json(error)
  }
}
