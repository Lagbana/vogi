class ProjectRoute {
  constructor (options = {}) {
    this.options = options
    this.router = options.router
    this.ProjectService = new options.ProjectService()
  }

  initialize () {
    this.router.post('/projects', (req, res) => this.createUser(req, res))
    this.router.get('/projects', (req, res) => this.retrieveUsers(req, res))
  }
}
