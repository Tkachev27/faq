const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const authRoutes = require('./routes/auth')
const subsoiluserRoutes = require('./routes/subsoilUser')
const keys = require('./config/keys')
const app = express()

mongoose
    .connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch((error) => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())
app.use('/api/auth', authRoutes)
app.use('/api/subsoiluser', subsoiluserRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
        )
    })
}

module.exports = app