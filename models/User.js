import mongoose from 'mongoose'
const {Schema, model, Types} = mongoose

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isOnline: {type:Boolean},
    tracks: [{type: Types.ObjectId, ref: 'Track'}],
})

export default model('User', schema)