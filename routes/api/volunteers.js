const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('volunteers')
})

module.exports = router
