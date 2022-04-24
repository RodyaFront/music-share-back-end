import jwt from "jsonwebtoken"

export async function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token === null) return res.status(401)

    await jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
        if(err) {
            return res.status(401).json({error: true, message: err.message})
        }
        req.user = user
        next()
    })
}