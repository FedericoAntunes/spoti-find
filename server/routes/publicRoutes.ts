import express from 'express'
import { index } from '../controllers/publicController'

const router = express.Router()

router.get('/', index)

export default router
