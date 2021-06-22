import express from "express";
import passport from 'passport'

const authRouter = express.Router()

authRouter.get('/google', passport.authenticate('google', { prompt: 'login' }))

authRouter.get('/failed', (req: any, res) => res.send('<h1>login failed</h1> <a href="/"> Go back</a>'))
authRouter.get('/good', (req: any, res) => {
    res.send(`You are logged in! Hi ${req.user} <a href="/"> Go back</a>`)
})

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    (req, res) => {
        res.redirect('/auth/good')
    }
)

export default authRouter