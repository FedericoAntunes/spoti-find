import { createSlice } from '@reduxjs/toolkit'
import { Token } from '../../types/tokenResponse'

const initialState: Token = { access_token: '', token_type: '', expires_in: 0 }

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken(_state, action) {
      const token = action.payload
      return token
    },
  },
})

export const { saveToken } = tokenSlice.actions

export default tokenSlice.reducer
