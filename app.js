const express = require('express')
const app = express()
const cors = require('cors')
const Routes = require('./Routes/Routes')
const morgan = require('morgan')
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/ezyskills' , Routes)

module.exports = app