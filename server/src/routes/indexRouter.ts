import express from "express";

const indexRouter = express.Router()


indexRouter.get('/', (req, res,) => {
    if (req.user) {
        res.send(`<h1>Doydong</h1><p>Welcome, ${req.user}</p>`)
        return
    }
    res.send('<h1>Doydong</h1><p>Welcome to a learning app.</p> <a href="./auth/google"> Log in</a>')
})


export default indexRouter