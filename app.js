const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const authRoutes = require('./routes/auth')
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')
const categoryRoutes = require('./routes/category')
const logRoutes = require('./routes/log')
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
app.use('/api/question', questionRoutes)
app.use('/api/answer', answerRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/log', logRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
        )
    })
}

module.exports = app
