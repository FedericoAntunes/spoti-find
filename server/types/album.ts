import { Artist } from './artist'
import {
  ImageObject,
  external_URLs,
  externals_ids,
  restrictions,
} from './common'
import { RawSimplifiedTrackResponse } from './tracks'

interface CopyrightObject {
  text: string
  type: string
}

interface SimplifiedArtistObject {
  external_urls: external_URLs
  href: string
  id: string
  name: string
  type: string
  uri: string
}

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
  href: string
  limit: number | null
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: SimplifiedAlbumObject[]
}

export interface AlbumsArrayResponse {
  albums: AlbumsResponse[]
}

export interface CompleteAlbum extends SimplifiedAlbumObject {
  artists: Artist[]
  tracks: RawSimplifiedTrackResponse
}
