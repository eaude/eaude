import mongoose from 'mongoose'
import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api/routes'

import bodyParser from 'body-parser'
import session from 'express-session'

import cookieParser from 'cookie-parser'
import passport from 'passport'

import './api/services/passport'

const MongoStore = require('connect-mongo')(session)

const app = express()

// app.use(expressValidator());// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

export default app
