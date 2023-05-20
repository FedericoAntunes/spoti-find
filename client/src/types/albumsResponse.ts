export interface external_URLs {
  spotify: string
}

export interface ImageObject {
  url: string
  height: number | null
  width: number | null
}

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
  available_markets: string[]
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
  albums: SimplifiedAlbumObject[]
}
