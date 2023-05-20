import express from 'express'
import { index } from '../controllers/queryController'

const router = express.Router()

router.post('/', index)

export default router
