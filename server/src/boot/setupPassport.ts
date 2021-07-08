import passport from "passport"
import { getManager, getRepository } from "typeorm"
import { User } from "../entity/User"
import { verifyPassword } from '../util/passwordUtils'
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy

/**
 * Configure Passport.js middleware. 
 */

const setupPassport = () => {
    /**
     * Takes a user and returns the user_id.
     */
    passport.serializeUser(function (user: any, done) {
        done(null, user.user_id);
    })
    /**
     * Takes the user_id of a user and returns the user.
     */
    passport.deserializeUser(async function (id: any, done) {
        await getRepository(User).findOne({ user_id: id }).then(user => {
            done(null, user)
        }).catch(err => done(err))
    })
    /**
     * Configure Google Strategy. 
     * Creates a new user if none is found. 
     */
    passport.use(new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: 'http://localhost:8080/auth/google/callback',
        scope: ['profile', 'email']
    }, async (clientID: string, refreshToken: string, profile: any, done: any) => {
        // Try to find the user 
        let user = await getRepository(User).findOne({ google_id: profile.id })

        if (!user) { // If not found they're not registered yet. 
            user = new User()
            user.google_id = profile.id
            user.name = profile.displayName
            if (profile.emails.length > 0) {
                const email = profile.emails[0].value
                user.email = email
            }
            await getManager().save(user)
        }
        console.log('Passport show user')
        console.log(user)
        return done(null, user)
    }))
    /**
     * Configure local strategy with email and password. 
     */

    passport.use(new LocalStrategy({
        usernameField: 'email' // Use email instead of default field "username"
    }, async (email: string, password: string, done: any) => {
        // Look for a user with that email. 
        const user = await getRepository(User).findOne({ email: email })
        if (!user) { // If no one was found
            return done(null, false) // They're not authenticated. 
        }
        // Otherwise proceed to verify the password
        const passwordIsValid = verifyPassword(password, user.hash, user.salt)
        if (passwordIsValid) {
            // If they match the user is authenticated. 
            return done(null, user)
        } else {
            return done(null, false)
        }
    }))



}


export { setupPassport }