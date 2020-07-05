const router = require('express').Router()
const volunteerController = require('../../controllers/volunteerController')

router
  .route('/')
  .get(volunteerController.findAll)
  .post(volunteerController.create)

module.exports = router
