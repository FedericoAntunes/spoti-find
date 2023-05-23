import axios, { AxiosResponse } from 'axios'

// Types
import { TokenResponse } from '../types/tokenResponse'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

const responseBody = (response: AxiosResponse) => response.data

const tokenRequests = {
  get: (url: string) => instance.get(url).then(responseBody),
}

export const TokenCalls = {
  getToken: (): Promise<TokenResponse> => tokenRequests.get('/auth'),
}
