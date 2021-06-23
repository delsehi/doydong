import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import authRouter from './routes/authRouter'
import indexRouter from './routes/indexRouter'
import "reflect-metadata"
import { createConnection } from "typeorm";
import { User } from './entity/User'
const Strategy = require('passport-google-oauth20').Strategy;

dotenv.config()
const app: express.Application = express()
const PORT: string = process.env['PORT'] || '8080'

const connectDB = async () => {
    await createConnection().then(async connection => {
        let delfi = new User()
        delfi.id = "305"
        delfi.name = "john smith"
        await connection.manager.save(delfi)
        console.log('saved')

    })
}

connectDB()

app.use(session({
    secret: process.env['EXPRESS_SESSION_SECRET'] || process.exit(1),
    resave: true,
    saveUninitialized: true,
}))

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user: any, done) {
    done(null, user.displayName);
})

passport.deserializeUser(function (id: any, done) {
    done(null, id)
})

passport.use(new Strategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'http://localhost:8080/auth/google/callback',
    scope: ['profile']
}, (clientID: string, refreshToken: string, profile: string, done: any) => {
    return done(null, profile)
}))

app.use('/auth', authRouter)

app.use('/', indexRouter)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
