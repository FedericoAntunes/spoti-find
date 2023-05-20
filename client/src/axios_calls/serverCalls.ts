import axios, { AxiosResponse } from 'axios'
import { Token } from '../types/tokenResponse'
import { AlbumsResponse } from '../types/albumsResponse'
import { SearchRequest } from '../types/searchRequest'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

const responseBody = (response: AxiosResponse) => response.data

const serverRequests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: SearchRequest) =>
    instance.post<SearchRequest>(url, body).then(responseBody),
}

export const ServerCalls = {
  getToken: (): Promise<Token> => serverRequests.get('/auth'),
  getAlbums: (body: SearchRequest): Promise<AlbumsResponse> =>
    serverRequests.post('/search', body),
}
