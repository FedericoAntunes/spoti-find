import { Express } from 'express'

import publicRoutes from './publicRoutes'
import authRoutes from './authRoutes'
import albumRoutes from './albumRoutes'
import trackRoutes from './trackRoutes'
import artistRoutes from './artistRoutes'

export default (app: Express) => {
  app.use('/', publicRoutes)
  app.use('/albums', albumRoutes)
  app.use('/tracks', trackRoutes)
  app.use('/artists', artistRoutes)
  app.use('/auth', authRoutes)
}
