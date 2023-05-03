const express = require('express')
const movieRouter = require('./routes/movie.js')
const app = express()

// Use port 3001 when testing, else 3000
const PORT = process.env.NODE_ENV === 'test' ? 3001 : 3000;

app.get("/", (req, res) => {
    res.json({message: 'OK'})
})

// Use movie router api
app.use("/api/movies", movieRouter)

const server = app.listen(PORT)

module.exports = { app, server }