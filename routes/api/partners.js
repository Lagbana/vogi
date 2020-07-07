const router = require('express').Router()
const partnerController = require('../../controllers/partnerController')

router
  .route('/')
  .get(partnerController.findAll)
  .post(partnerController.create)

router.get('/auth/github', passport.authenticate('github'))

module.exports = router
