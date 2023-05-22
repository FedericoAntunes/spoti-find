import { SimplifiedAlbumObject } from './album'
import { Artist } from './artist'
import { external_URLs, externals_ids, restrictions } from './common'

interface SimplifiedTrackObject {
  album: SimplifiedAlbumObject
  artist: Artist
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: externals_ids
  external_urls: external_URLs
  href: string
  id: string
  is_playable: boolean
  linked_from: object
  restrictions: restrictions
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: string
  uri: string
  is_local: boolean
}

export interface RawSimplifiedTrackResponse {
  href: string
  limit: number
  next: string | null
  offset: string
  previous: string | null
  total: number
  items: SimplifiedTrackObject[]
}

interface TrackObject {
  album: SimplifiedAlbumObject
  artist: Artist
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: externals_ids
  external_urls: external_URLs
  href: string
  id: string
  is_playable: boolean
  linked_from: object
  restrictions: restrictions
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: string
  uri: string
  is_local: boolean
}

export interface TracksResponse {
  href: string
  limit: number
  next: string | null
  offset: string
  previous: string | null
  total: number
  items: TrackObject[]
}

export interface RawTracksResponse {
  tracks: TracksResponse
}
