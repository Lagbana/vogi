class PartnerRoute {
  constructor (options = {}) {
    super()
    this.options = options
    this.router = options.Router
    this.partnerService = new options.PartnerService()
  }

  initialize () {
    this.router.get('/partner', (req, res) => this.retrieveUser(req, res))
    this.router.get('/patners', (req, res) => this.retrieveUsers(req, res))
    this.router.post('/partners', (req, res) => this.createUser(req, res))
  }

  async retrieveUser (req, res) {
    try {
      const _id = this._getUser(req)
      if (!_id) return res.send({})
      const partner = await this.partnerService.retrievePartner({ _id })
      res.send(partner)
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }

  async retrieveUsers (req, res) {
    try {
    } catch (err) {
      throw err
    }
  }

  async createUser () {
    try {
    } catch (err) {
      throw err
    }
  }

  _getUser (req) {
    const sessions = req.sessionStore.sessions
    const key = Object.keys(sessions)[0]
    let context = sessions[key]
    if (!context) return
    context = JSON.parse(context)
    const {
      passport: { user }
    } = context
    return user
  }
}

module.exports = PartnerRoute
