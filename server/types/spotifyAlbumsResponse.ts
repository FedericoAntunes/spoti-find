import { ImageObject, external_URLs } from './common'

interface restrictions {
  reason: string
}

interface CopyrightObject {
  text: string
  type: string
}

interface externals_ids {
  isrc: string
  ean: string
  upc: string
}

interface SimplifiedArtistObject {
  external_urls: external_URLs
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface SimplifiedAlbumObject {
  album_type: string
  total_tracks: number
  available_markets: number
  external_urls: external_URLs
  href: string
  id: string
  images: ImageObject[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions?: restrictions
  type: string
  uri: string
  copyrights?: CopyrightObject[]
  externals_ids?: externals_ids
  genres?: string[]
  label?: string
  popularity?: number
  album_group?: string
  artists: SimplifiedArtistObject[]
}

export interface AlbumsResponse {
  href: string
  limit: number | null
  next: number | null
  offset: number
  previous: string | null
  total: number
  items: SimplifiedAlbumObject[]
}
