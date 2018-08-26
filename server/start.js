import mongoose from 'mongoose'

// import all of our models
import './api/models/User'
import './api/models/Post'

import app from './app'

mongoose.connect(process.env.DATABASE_URL)
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`Error In Mongoose: ${err}`)
})
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080
// Listen the server
app.set('port', port)
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
