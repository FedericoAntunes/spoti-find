import { Artist, SimplifiedArtistObject } from './artist'
import {
  CopyrightObject,
  ImageObject,
  external_URLs,
  externals_ids,
  restrictions,
} from './common'
import { RawSimplifiedTrackObject } from './track'

export interface SimplifiedAlbumObject {
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
  tracks: RawSimplifiedTrackObject
}

interface RawNewAlbumsResponse {
  href: string
  items: SimplifiedAlbumObject[]
  limit: number | null
  next: string | null
  offset: number
  previous: string | null
  total: number
}

export interface NewAlbumsResponse {
  albums: RawNewAlbumsResponse
}

export interface CompleteAlbum extends SimplifiedAlbumObject {
  artists: Artist[]
  tracks: RawSimplifiedTrackObject
}
