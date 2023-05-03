const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const csv = require('fast-csv');

const dbfile = "app/movieDatabase.sqlite"

// Create in memory database when testing
// else create a database file and setup the movie table
let db
if (process.env.NODE_ENV === 'test') {
    db = new sqlite3.Database(':memory:');
}
else {
    db = new sqlite3.Database(dbfile, (err) => {
        if (err) {
            console.error(err.message)
        } else {
            console.log('Connected to Database...')
            createMovieTable()
        }
    })
}

/*
* Create movie table, clear the table and the id sequence,
* then insert rows into the database from the csv file
*/
function createMovieTable() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS movie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            year INTEGER
        )`)
        db.run(`DELETE FROM movie`)
        db.run(`DELETE FROM sqlite_sequence WHERE name = 'movie'`)
        
        fs.createReadStream(__dirname + '/movies.csv')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => insertMovie(row))
        .on('end', () => console.log("CSV uploaded"));
        })
}

/*
* Insert rows into the database
*/
function insertMovie(movie) {
    var sql = "INSERT INTO movie (title, year) VALUES (?,?)"
    db.run(sql, [movie.Title, movie.Year])
}

module.exports = db