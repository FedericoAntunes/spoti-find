// Calls
import { SpotifySearchCall } from '../axios_calls/spotifyCalls'

// Types
import { Request, Response } from 'express'

// Model
import QueryData from '../models/QueryData'

export async function getAlbum(req: Request, res: Response) {
  const { token, album_id } = req.body

  try {
    const album = await SpotifySearchCall.getArtist(`/albums/${album_id}`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    res.json(album)
  } catch (error) {
    res.json(error)
  }
}

export async function getAlbumsByArtistName(req: Request, res: Response) {
  const { artist_name, token, ip, offset } = req.body

  try {
    const response = await SpotifySearchCall.getArtist(
      `/search?q=${artist_name}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    )
    const artistId = response.artists.items[0].id

    const realArtistName = response.artists.items[0].name

    const haveMoreResults: string[] = []

    const simpleAlbums = async () => {
      const response = await SpotifySearchCall.getSimpleAlbums(
        `/artists/${artistId}/albums?include_groups=album&offset=0&limit=50`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )

      let simpleAlbumsIds = []

      response.next && haveMoreResults.push(response.next)

      for (const simpleAlbum of response.items) {
        simpleAlbumsIds.push(simpleAlbum.id)
      }
      return simpleAlbumsIds
    }

    const albumsIds = simpleAlbums()

    function divideArray(array: string[]) {
      var subarrays = []
      for (var i = 0; i < array.length; i += 20) {
        var subarray = array.slice(i, i + 20)
        subarrays.push(subarray.toString())
      }
      return subarrays
    }

    let resultAlbums = []

    const stringArray = divideArray(await albumsIds)

    for (const arr of stringArray) {
      const albumsArray = await SpotifySearchCall.getAlbums(
        `/albums?ids=${arr}`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      )
      for (const album of albumsArray.albums) {
        resultAlbums.push(album)
      }
    }
    if (!offset) {
      await QueryData.create({ ip, query: artist_name, artist: realArtistName })
    }
    res.json({ returned_albums: resultAlbums })
  } catch (error) {
    res.json(error)
  }
}

export async function newAlbums(req: Request, res: Response) {
  const { token, offset } = req.body

  try {
    const newAlbums = await SpotifySearchCall.getAlbums(
      `/browse/new-releases?offset=${offset ? offset : 0}`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    )
    res.json(newAlbums)
  } catch (error) {
    res.json(error)
  }
}
