import { Token } from './tokenResponse'

export interface SearchRequest {
  artist_name?: string
  token: Token
  ip?: string
  year_range?: string
  genre?: string
  album_id?: string
}
