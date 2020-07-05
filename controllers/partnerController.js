const db = require('../models')

// Defining methods for the bookController
module.exports = {
  findAll: (req, res) => {
    db.Partner.find(req.query)
      .then(dbPartner => res.json(dbPartner))
      .catch(err => res.status(422).json(err))
  },
  create: (req, res) => {
    db.Partner.create(req.body)
      .then(dbPartner => res.json(dbPartner))
      .catch(err => res.status(422).json(err))
  }
}
