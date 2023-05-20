import { Request, Response } from 'express'
import { SpotifySearchCall } from '../axios_calls/spotifyCalls'
import QueryData from '../models/QueryData'

export async function index(req: Request, res: Response) {
  const { artist_name, token, ip } = req.body

  try {
    const response = await SpotifySearchCall.getArtist(
      `/search?q=${artist_name}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const artistId = response.artists.items[0].id

    const realArtistName = response.artists.items[0].name

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

    await QueryData.create({ ip, query: artist_name, artist: realArtistName })

    res.json(albums)
  } catch (error) {
    res.json(error)
  }
}

export async function newAlbums(req: Request, res: Response) {
  const { token } = req.body

  try {
    const newAlbums = await SpotifySearchCall.getAlbums(
      '/browse/new-releases',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    res.json(newAlbums)
  } catch (error) {
    res.json(error)
  }
}
