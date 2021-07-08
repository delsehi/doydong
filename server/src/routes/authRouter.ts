import express from "express";
import passport from 'passport'
import { send } from "process";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { createHashAndSalt } from "../util/passwordUtils";

const authRouter = express.Router()

// Login with google
authRouter.get('/google', passport.authenticate('google', { prompt: 'login' }))
// Login with email and password

const logstuff = (req: any, res: any, next: any) => {
    console.log(req.body)
    console.log(req.user)
    next()
}

authRouter.post('/login', logstuff, passport.authenticate('local'), logstuff)


authRouter.get('/protected', (req: any, res, next) => {
    if (req.isAuthenticated()) {
        res.send({ msg: `Sucess, your name is ${req.user.name}` })
    } else {
        res.send({ msg: "Noo protected route" })
    }
})


authRouter.post('/register', async (req, res, next) => {
    console.log('Register....')
    const [salt, hash] = createHashAndSalt(req.body.password)
    const user = new User()
    user.email = req.body.email
    user.hash = hash
    user.salt = salt
    user.name = req.body.name
    console.log('saving new user')
    console.log(user)

    getRepository(User).save(user).then(() => {
        res.status(201).send('Account created.')
    }).catch(err => {
        console.error(err)
        res.status(400).send(`Something went wrong. 
        Maybe your email has already been used to create an account? Please try again.`)
    })


})


// Callback for logging in with google. 
authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed', session: true }),
    (req, res) => {
        res.redirect('http://localhost:3000')
    }
)

export default authRouter