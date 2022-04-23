import {Router} from 'express'
const router = Router()

import musicController from '../controllers/music.controller.js'

// /api/music

router.get('/tracks', musicController.getAllTracks)
router.post('/add-track', musicController.addTrack)

export default router