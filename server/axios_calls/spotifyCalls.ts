import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// Types
import { ArtistResponse } from '../types/spotifyArtistResponse'
import { AlbumsResponse } from '../types/spotifyAlbumsResponse'

const instance = axios.create({
  baseURL: process.env.SPOTIFY_SEARCH_URL,
})

const responseBody = (response: AxiosResponse) => response.data

const spotifyRequest = {
  get: (url: string, headers: AxiosRequestConfig) =>
    instance.get(url, headers).then(responseBody),
}

export const SpotifySearchCall = {
  getArtist: (
    url: string,
    headers: AxiosRequestConfig
  ): Promise<ArtistResponse> => spotifyRequest.get(url, headers),
  getSimpleAlbums: (
    url: string,
    headers: AxiosRequestConfig
  ): Promise<AlbumsResponse> => spotifyRequest.get(url, headers),
  getAlbums: (
    url: string,
    headers: AxiosRequestConfig
  ): Promise<AlbumsResponse> => spotifyRequest.get(url, headers),
}
