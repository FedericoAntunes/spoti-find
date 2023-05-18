import axios, { AxiosResponse } from 'axios'
import { Token } from '../types/spotifyToken'

const instance = axios.create({
  baseURL: process.env.SPOTIFY_TOKEN_BASE_URL,
})

const responseBody = (response: AxiosResponse) => response.data

const tokenRequest = {
  post: (url: string, body: string) =>
    instance.post(url, body).then(responseBody),
}

export const TokenCall = {
  getToken: (body: string): Promise<Token> =>
    tokenRequest.post('/api/token', body),
}
