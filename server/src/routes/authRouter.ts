import express from "express";
import passport from 'passport'
import { send } from "process";

const authRouter = express.Router()

authRouter.get('/google', passport.authenticate('google', { prompt: 'login' }))


authRouter.get('/protected', (req:any, res, next) => {
    if (req.isAuthenticated()) {
        res.send({msg: `Sucess, your name is ${req.user.name}`})
    } else {
        res.send({msg: "Noo protected route"})
    }
})

authRouter.get('/failed', (req: any, res) => res.send('<h1>login failed</h1> <a href="/"> Go back</a>'))
authRouter.get('/good', (req: any, res) => {
    res.send(`You are logged in! Hi ${req.user.name} <a href="/"> Go back</a>`)
})

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed', session: true }),
    (req, res) => {

     //   res.status(401).json('Cool')
        res.redirect('http://localhost:3000')

       // res.redirect('/auth/good')
    }
)

export default authRouter