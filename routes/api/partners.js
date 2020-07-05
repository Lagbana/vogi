const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('partners')
})

module.exports = router
