import { ImageObject, external_URLs } from './common'

interface followers {
  href: string | null
  total: number
}

export interface Artist {
  external_urls: external_URLs
  followers: followers
  genres: string[]
  href: string
  id: string
  images: ImageObject[]
  name: string
  popularity: number
  type: string
  uri: string
}

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
