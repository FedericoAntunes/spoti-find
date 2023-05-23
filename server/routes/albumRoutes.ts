import express from 'express'
import {
  getAlbum,
  getAlbumsByArtistName,
  newAlbums,
} from '../controllers/albumsController'

const router = express.Router()

router.post('/search', getAlbumsByArtistName)
router.post('/new_albums', newAlbums)
router.post('/album_data', getAlbum)

export default router
