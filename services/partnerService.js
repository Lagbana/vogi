// Require partner dao
const { PartnerDao } = require('../dao')

/*
    PostService extends PostDao to access it's methods
*/

class PartnerService extends PartnerDao {
  constructor (options = {}) {
    super()
    this.options = options
  }

  async retrievePartner (context) {
    try {
      const partner = await this.getPartner(context)
      return partner
    } catch (err) {
      throw err
    }
  }
}

module.exports = PartnerService
