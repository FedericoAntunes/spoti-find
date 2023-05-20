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

    const simpleAlbums = async () => {
      const response = await SpotifySearchCall.getSimpleAlbums(
        `/artists/${artistId}/albums?&limit=20`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      let simpleAlbumsIds = ''

      for (const simpleAlbum of response.items) {
        simpleAlbumsIds.length > 0
          ? (simpleAlbumsIds += `,${simpleAlbum.id}`)
          : (simpleAlbumsIds += `${simpleAlbum.id}`)
      }
      return simpleAlbumsIds
    }

    const albums = await SpotifySearchCall.getAlbums(
      `/albums?ids=${await simpleAlbums()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    res.json(albums)
  } catch (error) {
    res.json(error)
  }
}
