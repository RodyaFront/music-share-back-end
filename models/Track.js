import mongoose from 'mongoose'
const {Schema, model} = mongoose

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    link: {type: String, required: true},
    genres: {type: Array},
    time: {type: String},
    previewImage: {type: String},
    songText: {type: String},
    // creator: {type: Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: new Date() },
})

export default model('Track', schema)