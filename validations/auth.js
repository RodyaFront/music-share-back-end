import {check} from "express-validator"

export default {
    registration: [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Wrong password').isLength({min: 6})
    ],
    login: [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'Wrong password').exists()
    ],
}