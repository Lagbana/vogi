const path = require('path')
const router = require('express').Router()
const volunteers = require('./volunteers.js')
const partners = require('./partners.js')

router.use('/volunteers', volunteers)

router.use('/partners', partners)

module.exports = router
