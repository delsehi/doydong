import crypto from 'crypto'


const createHashAndSalt: any = (password: string) => {
    const salt = crypto.randomBytes(32).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return [salt, hash]
}

const verifyPassword = (password: string, hash: string, salt: string) => {
    return hash === crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
}

export { createHashAndSalt, verifyPassword }