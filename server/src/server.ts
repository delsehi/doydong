import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import authRouter from './routes/authRouter'
import indexRouter from './routes/indexRouter'
import "reflect-metadata"
import { createConnectionToDB } from './boot/setupDB'
import { setupPassport } from './boot/setupPassport'
import apiRouter from './routes/apiRouter'

dotenv.config()
const app: express.Application = express()
const PORT: string = process.env['PORT'] || '8080'

const main = async () => {
    await createConnectionToDB()

    app.use(session({
        secret: process.env['EXPRESS_SESSION_SECRET'] || process.exit(1),
        resave: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        },
        saveUninitialized: true,
    }))

    app.use(express.urlencoded({
        extended: true,
    }))
    app.use(express.json())
    app.use(passport.initialize())
    app.use(passport.session())

    setupPassport()

    app.use('/auth', authRouter)
    app.use('/', indexRouter)
    app.use('/api', apiRouter)

    app.listen(PORT, () => {
        console.log(`⚡️ Server is running at http://localhost:${PORT} 🐸`)
    })
}
main().catch(err => console.error(err))
