import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tokenSlice from './slices/tokenSlice'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  token: tokenSlice,
})

const persistConfig = { key: 'root', storage }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)
export { persistor }

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
