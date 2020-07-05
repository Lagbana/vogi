const router = require('express').Router()
const partnerController = require('../../controllers/partnerController')

router
  .route('/')
  .get(partnerController.findAll)
  .post(partnerController.create)

module.exports = router
