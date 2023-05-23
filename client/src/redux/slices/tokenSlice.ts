import { createSlice } from '@reduxjs/toolkit'

// Types
import { Token } from '../../types/tokenResponse'

const initialState: Token = {
  access_token: null,
  token_type: '',
  expiration_date: null,
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken(_state, action) {
      const token = action.payload
      token.expiration_date = Date.now() + 3600 * 1000
      delete token.expires_in
      return token
    },
  },
})

export const { saveToken } = tokenSlice.actions

export default tokenSlice.reducer
