import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// Types
import { RawSimplifiedTrackResponse } from '../types/tracks'
import { ArtistResponse } from '../types/artist'
import {
  AlbumsArrayResponse,
  AlbumsResponse,
  CompleteAlbum,
} from '../types/album'

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
  getAlbum: (
    url: string,
    headers: AxiosRequestConfig
  ): Promise<CompleteAlbum> => spotifyRequest.get(url, headers),
  getSimpleAlbums: (
    url: string,
    headers: AxiosRequestConfig
  ): Promise<AlbumsResponse> => spotifyRequest.get(url, headers),
  getAlbums: (
    url: string,
    headers: AxiosRequestConfig
  ): Promise<AlbumsArrayResponse> => spotifyRequest.get(url, headers),
  getTracks: (
    url: string,
    headers: AxiosRequestConfig
  ): Promise<RawSimplifiedTrackResponse> => spotifyRequest.get(url, headers),
}
