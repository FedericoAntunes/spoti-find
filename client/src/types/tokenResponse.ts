export interface Token {
  access_token: string | null
  token_type: string
  expiration_date: Date | null
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}
