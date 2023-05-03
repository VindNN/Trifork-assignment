const { app } = require('../server.js');
const sqlite3 = require('sqlite3').verbose();
const request = require('supertest');
const db = new sqlite3.Database(':memory:');

beforeAll(() => {
    process.env.NODE_ENV = 'test';
})

const initializeDb = db => {
    db.run(`CREATE TABLE IF NOT EXISTS movie (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        year INTEGER
    )`)
    db.run(`DELETE FROM movie`)
    
    const insertStmt = db.prepare(`INSERT INTO movie (title, year) VALUES (?,?)`)
    insertStmt.run('Titanic', 1997)
    insertStmt.finalize()
}

test('test default route', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
})

/*
test('get all movies', () => {
    db.serialize(async () => {
        initializeDb(db)
        const res = await request(app).get('/api/movies')
        const response = [
            { id: 1, title: 'Titanic', year: 1997 }
        ]
        expect(res.status).toBe(200)
        expect(res.body).toEqual(response)
    })
})
*/