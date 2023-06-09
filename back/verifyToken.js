import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    console.log(req.body)
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        console.log(verified)
        next() // continuamos
    } catch (error) {
        console.log('header')
        res.status(400).json({ error: 'token no es válido' })
    }
}