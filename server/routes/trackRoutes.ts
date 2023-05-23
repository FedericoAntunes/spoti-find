import express from 'express'
import { getFilteredTracks, getTracks } from '../controllers/tracksController'

const router = express.Router()

router.post('/initial_tracks', getTracks)
router.post('/filtered_tracks', getFilteredTracks)

export default router
