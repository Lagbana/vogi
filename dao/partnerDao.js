// Require volunteer model
const { Partner } = require('../models')

// Volunteer Dao Class with database querying methods
class PartnerDao {
  constructor (options = {}) {
    this.options = options
    this.user = Partner
  }

  /*
      *method to get the partner using the findOne query
      context = req.body, to be inserted in the associated route handler
  */
  async getPartner (context) {
    try {
      const partner = await this.user.findOne(context)
      return partner
    } catch (err) {
      throw err
    }
  }

  /*
      *method to create new partner with the create query
      context = req.body, to be inserted in the associated route handler
  */
  async createPartner (context) {
    try {
      const newPartner = await this.user.create(context)
      return newPartner
    } catch (err) {
      throw err
    }
  }
}

module.exports = PartnerDao
