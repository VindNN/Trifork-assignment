const express = require('express')
const movieController = require('../controllers/movie.js')

// Create movie router
const movieRouter = express.Router()

// Call controller on GET requests
movieRouter.get('/', movieController.getAllMovies)
movieRouter.get('/title/:input', movieController.getMoviesByTitle)
movieRouter.get('/year/:input', movieController.getMoviesByYear)

module.exports = movieRouter