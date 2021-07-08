import passport from "passport"
import { getManager, getRepository } from "typeorm"
import { User } from "../entity/User"
const Strategy = require('passport-google-oauth20').Strategy


const setupPassport = () => {
    passport.serializeUser(function (user: any, done) {
        done(null, user.user_id);
    })

    passport.deserializeUser(async function (id: any, done) {
        await getRepository(User).findOne({ user_id: id }).then(user => {
            done(null, user)
        }).catch(err => done(err))
    })

    passport.use(new Strategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: 'http://localhost:8080/auth/google/callback',
        scope: ['profile']
    }, async (clientID: string, refreshToken: string, profile: any, done: any) => {
        // Try to find the user 
        let user = await getRepository(User).findOne({ user_id: profile.id })
        if (!user) { // If not found they're not registered yet. 
            console.log('User not found so creating one')
            user = new User()
            user.user_id = profile.id
            user.name = profile.displayName
            await getManager().save(user)
        }
        console.log('Passport show user')
        console.log(user)
        return done(null, user)
    }))
}


export { setupPassport }