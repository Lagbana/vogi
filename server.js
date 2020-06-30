/* 
Import Dependencies
  * express - is a framework for the server setup
  * path - is a node js module that provides a way of working with directories and file paths
  * compression - is a middleware that decreases the downloadable amount of data that’s served to users
*/

require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
// const initializeRoutes = require('./routes')
const compression = require('compression')

// Initialize the express app
const app = express()

// Re-direct all unsecure traffic through the https protocol
function requireHTTPS (req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get('x-forwarded-proto') !== 'https' &&
    process.env.NODE_ENV !== 'development'
  ) {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}

// Set up all middleware
app.use(requireHTTPS)
app.use(cors())
app.use(logger('dev'))
app.use(compression())

// Connect to Mongo DB
// mongoose.connect(process.env.MONGO_URI, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

// initializeRoutes(app)

// Handling and rendering of static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + './client/build/index.html'))
})

/*
  Set's the PORT to 3000 when in local development OR to the PORT set by Heroku's environment when deployed
  The server accepts the PORT as a parameter to listen on.
*/
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
