const db = require('../database.js')

// Query all movies in movie table on '/' GET request
const getAllMovies = (req, res) => {
    var sql = "select * from movie"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message})
        } else {
            res.json({
                "message":"success",
                "data":rows
            })
        }
    })
}

// Query all movies containing a specific string in title on '/title/:input' GET request
const getMoviesByTitle = (req, res) => {
    var sql = "select * from movie where title like ?"
    var params = ['%' + req.params.input + '%']
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message})
        } else {
            res.json({
                "message":"success",
                "data":rows
            })
        }
    })
}

// Query all movies containing a specific number in year on '/year/:input' GET request
const getMoviesByYear = (req, res) => {
    var sql = "select * from movie where year like ?"
    var params = ['%' + req.params.input + '%']
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message})
        } else {
            res.json({
                "message":"success",
                "data":rows
            })
        }
    })
}

exports.getAllMovies = getAllMovies
exports.getMoviesByTitle = getMoviesByTitle
exports.getMoviesByYear = getMoviesByYear