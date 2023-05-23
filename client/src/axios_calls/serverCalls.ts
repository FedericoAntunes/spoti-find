import axios, { AxiosResponse } from 'axios'
import { store } from '../redux/store'
import { saveToken } from '../redux/slices/tokenSlice'
import { TokenCalls } from './tokenCall'

// Types
import {
  AlbumsResponse,
  CompleteAlbum,
  NewAlbumsResponse,
} from '../types/album'
import { SearchRequest } from '../types/searchRequest'
import { RawTracksResponse } from '../types/track'
import { ArtistResponse } from '../types/artist'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Checks if the token stills valid before every call, if not make a call and refresh the token.
instance.interceptors.request.use(
  async function (config) {
    if (config.data.token.expiration_date <= Date.now()) {
      const newToken = await TokenCalls.getToken()
      store.dispatch(saveToken(newToken))
      config.data.token = store.getState().token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const responseBody = (response: AxiosResponse) => response.data

const serverRequests = {
  post: (url: string, body: SearchRequest) =>
    instance.post<SearchRequest>(url, body).then(responseBody),
}

export const ServerCalls = {
  getAlbum: (body: SearchRequest): Promise<CompleteAlbum> =>
    serverRequests.post('/albums/album_data', body),
  getAlbums: (body: SearchRequest): Promise<AlbumsResponse> =>
    serverRequests.post('/albums/search', body),
  getNewAlbums: (body: SearchRequest): Promise<NewAlbumsResponse> =>
    serverRequests.post('/albums/new_albums', body),
  getTracks: (url: string, body: SearchRequest): Promise<RawTracksResponse> =>
    serverRequests.post(url, body),
  getArtists: (url: string, body: SearchRequest): Promise<ArtistResponse> =>
    serverRequests.post(url, body),
}
