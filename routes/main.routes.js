import express from 'express'
const router = express.Router();

import authRoutes from '../routes/auth.routes.js'
import musicRoutes from '../routes/music.routes.js'

router.use('/api/auth', authRoutes)

router.use('/api/music', musicRoutes)

router.get('/ping', (req,res)=>{
    res.json({message: 'pong'})
})

export default router