import {Router} from 'express'
import {authenticateToken} from '../utils/helper.js'
const router = Router()

import musicController from '../controllers/music.controller.js'

// /api/music

router.get('/tracks', musicController.getAll)
router.post('/add', authenticateToken, musicController.add)
router.post('/delete', authenticateToken, musicController.delete)
router.post('/edit', authenticateToken, musicController.edit)

export default router