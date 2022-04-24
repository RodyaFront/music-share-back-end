import {validationResult} from "express-validator"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "config";

export default {
    registration: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Validation error'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'this user already registered'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json({ok: true, message: 'User successfully created.'})

        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Validation error'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }

            await User.findOneAndUpdate({ email }, { $set: { isOnline: true } });

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json('Wrong password or email')
            }

            const token = jwt.sign(
                {userIf: user.id},
                config.get('JWT_SECRET'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id, ok: true})

        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
}