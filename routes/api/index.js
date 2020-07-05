const path = require('path')
const router = require('express').Router()
const volunteers = require('./volunteers.js')
const partners = require('./partners.js')

router.use('/volunteers', volunteers)

router.use('/partners', partners)

// For anything else, render the html page
router.use((req, res) =>
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
)

module.exports = router
