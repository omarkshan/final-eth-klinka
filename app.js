// Modules
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// Routes
const routes = require('./routes/router')

// App Intialization
const app = express()

// View Section
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Initializing Body Parser
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.use('/', routes)

module.exports = app