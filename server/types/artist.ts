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
