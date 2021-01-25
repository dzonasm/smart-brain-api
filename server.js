const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const imageEntries = require('./controllers/imageEntries')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'dramblysdb',
        database: "smart-brain"
    }
});


const app = express();
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send(database.users);
})


app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db))


app.put('/image', (req, res) => imageEntries.handleImageEntries(req, res, db))
app.post('/imageUrl', (req, res) => imageEntries.handleApiCall(req, res))




app.listen(3000, () => {
    console.log('app is running on port 3000')
})


