class ProjectRoute {
  constructor (options = {}) {
    this.options = options
    this.router = options.Router
    this.ProjectService = new options.ProjectService()
    this.GithubService = new options.GithubService()
  }

  initialize () {
    this.router.post('/projects', (req, res) => this.createProject(req, res))
    this.router.get('/projects', (req, res) => this.retrieveProjects(req, res))
  }

  async createProject (req, res) {
    try {
      const newProject = await this.ProjectService.newProject(req.body)
      const newRepo = this.GithubService.newRepo(newProject)
      res.json(newProject)
    } catch (err) {
      console.error(err)
      throw err
    }
  }



  async retrieveProjects (req, res) {
    try {
      const projects = await this.ProjectService.retrieveProjects()
      res.json(projects)
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }
}

module.exports = ProjectRoute
