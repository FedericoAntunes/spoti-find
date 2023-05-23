import express from 'express'
import { getArtistByGenre, getArtists } from '../controllers/artistsController'

const router = express.Router()

router.post('/initial_artists', getArtists)
router.post('/filtered_artists', getArtistByGenre)

export default router
