import { Artist } from './artist'

interface Artists {
  href: string
  limit: number
  next: number | null
  offset: number
  previous: string | null
  total: number
  items: Artist[]
}

export interface ArtistResponse {
  artists: Artists
}
