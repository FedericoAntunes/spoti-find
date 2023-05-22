import express from 'express'
import {
  getAlbum,
  getArtistByGenre,
  getArtists,
  getFilteredTracks,
  getTracks,
  index,
  newAlbums,
} from '../controllers/queryController'

const router = express.Router()

router.post('/', index)
router.post('/new_albums', newAlbums)
router.post('/tracks', getTracks)
router.post('/filtered_tracks', getFilteredTracks)
router.post('/artists', getArtists)
router.post('/filtered_artists', getArtistByGenre)
router.post('/album', getAlbum)

export default router
