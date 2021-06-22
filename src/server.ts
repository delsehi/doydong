import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import authRouter from './routes/authRouter'
import indexRouter from './routes/indexRouter'
const Strategy = require('passport-google-oauth20').Strategy;

dotenv.config()
const app: express.Application = express()
const PORT: string = process.env['PORT'] || '8080'


app.use(session({
    secret: process.env['EXPRESS_SESSION_SECRET'] || process.exit(),
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
