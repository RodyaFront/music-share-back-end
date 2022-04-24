import Track from '../models/Track.js'
import { parseYoutubeMusic } from '../utils/parsers.js'

export default {
    getAll: async (req, res, next) => {
        try {
            const tracks = await Track.find()
            res.json({items: tracks})
        } catch (e) {
            next(e)
        }
    },
    add: async (req, res, next) => {
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
    delete: async (req, res, next) => {
        try {
            const {id} = req.body
            await Track.findByIdAndDelete(id)
            res.status(200).json({ok: true})
        } catch (e) {
            next(e)
        }
    },
    edit: async (req, res, next) => {
        try {
            const {data, id} = req.body
            await Track.findByIdAndUpdate(id, data)
            res.status(200).json({ok: true})
        } catch (e) {
            next(e)
        }
    },
}