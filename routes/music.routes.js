import {Router} from 'express'
import {authenticateToken} from '../utils/helper.js'
const router = Router()

import musicController from '../controllers/music.controller.js'

// /api/music

router.get('/tracks', musicController.getAllTracks)
router.post('/add-track', authenticateToken, musicController.addTrack)

export default router