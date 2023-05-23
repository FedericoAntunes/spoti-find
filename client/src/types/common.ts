export interface external_URLs {
  spotify: string
}

export interface ImageObject {
  url: string
  height: number | null
  width: number | null
}

export interface externals_ids {
  isrc: string
  ean: string
  upc: string
}
export interface restrictions {
  reason: string
}

export interface CopyrightObject {
  text: string
  type: string
}
