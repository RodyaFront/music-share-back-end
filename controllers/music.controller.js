import Track from '../models/Track.js'
import { parseYoutubeMusic } from '../utils/parsers.js'

export default {
    getAllTracks: async (req, res, next) => {
        try {
            const tracks = await Track.find()
            res.json({items: tracks})
        } catch (e) {
            next(e)
        }
    },
    addTrack: async (req, res, next) => {
        try {
            const {link, genres} = req.body

            const parseData = await parseYoutubeMusic(link)

            const {name, description, time, songText, previewImage} = parseData

            const newTrack = new Track({ name, description, time, songText, link, genres, previewImage })

            await newTrack.save()

            res.json({ data: newTrack, status: 201 });
        } catch (e) {
            next(e)
        }
    },
}