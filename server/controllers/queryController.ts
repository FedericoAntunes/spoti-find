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

export async function getTracks(req: Request, res: Response) {
  const { token } = req.body

  try {
    const baseTracks = await SpotifySearchCall.getTracks(
      '/search?q=year:1960-2023&type=track',
      {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    res.json(filteredByYearTracks)
  } catch (error) {
    res.json(error)
  }
}

export async function getArtists(req: Request, res: Response) {
  const { token } = req.body

  try {
    const baseArtists = await SpotifySearchCall.getArtist(
      `/search?q=year:1980-2023&type=artist`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    res.json(baseArtists)
  } catch (error) {
    res.json(error)
  }
}

export async function getArtistByGenre(req: Request, res: Response) {
  const { token, genre } = req.body

  try {
    const filteredArtists = await SpotifySearchCall.getArtist(
      `/search?q=genre:${genre}&type=artist`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    res.json(filteredArtists)
  } catch (error) {
    res.json(error)
  }
}

export async function getAlbum(req: Request, res: Response) {
  const { token, album_id } = req.body

  try {
    const album = await SpotifySearchCall.getArtist(`/albums/${album_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    res.json(album)
  } catch (error) {
    res.json(error)
  }
}
