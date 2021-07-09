import express from "express";
import passport from 'passport'
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { createHashAndSalt } from "../util/passwordUtils";

const authRouter = express.Router()

// Login with google
authRouter.get('/google', passport.authenticate('google', { prompt: 'login' }))
// Login with email and password

const logstuff = (req: any, res: any, next: any) => {
    console.log("req.body: ", req.body)
    console.log("req.user: ",req.user)
    console.log("req.session: ",req.session)
    next()
}

const loginResponse = (req: any, res: any) => {
    res.status(200).send({msg: 'You are logged in now'})
}

authRouter.post('/login', logstuff, passport.authenticate('local'), logstuff, loginResponse)

authRouter.get('/getuser', logstuff, (req: any, res) => {
    if (req.isAuthenticated()) {
        const userData = {
            name: req.user.name,
            user_id: req.user.user_id,
            email: req.user.email
        }
        res.send(userData)
    } else {
        console.log('Unauthorized')
        res.status(401).send({ msg: "You are not logged in." })
    }
})


authRouter.post('/register', async (req, res, next) => {
    console.log('Register. Req.body: ', req.body)
    let user;
    try {
        console.log(req.body.email, req.body.name, req.body.password)  
        const [salt, hash] = createHashAndSalt(req.body.password)
        user = new User()
        user.email = req.body.email
        
        user.hash = hash
        user.salt = salt
        user.name = req.body.name
        console.log('saving new user')
        console.log(user)
        
    } catch (error) {
        console.error(error)
        return res.status(400).send('You did something wrong. ')
    }

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