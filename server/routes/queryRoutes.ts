import express from 'express'
import { index, newAlbums } from '../controllers/queryController'

const router = express.Router()

router.post('/', index)
router.post('/new_albums', newAlbums)

export default router
