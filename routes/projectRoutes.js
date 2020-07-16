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
    this.router.put('/projects', (req, res) => this.updateProject(req, res))
    this.router.delete('/projects', (req, res) => this.deleteProject(req, res))
  }

  async createProject (req, res) {
    try {
      const newProject = await this.ProjectService.newProject(req.body)
      console.log(newProject)
      // Create new repository for each project
      const newRepo = this.GithubService.newRepo(newProject)
      res.json(newProject)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async retrieveProjects (req, res) {
    try {
      const projects = await this.ProjectService.retrieveProjects(req.user._id)
      res.json(projects)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async deleteProject (req, res) {
    try {
      // Delete repository
      const repo_name = req.body.name
      this.GithubService.deleteRepo(repo_name)

      // Delete project in DB
      const projectID = req.body._id
      const deletedProject = await this.ProjectService.deleteProject({
        _id: projectID
      })
      res.json(deletedProject)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  async updateProject (req, res) {
    try {
      const project = await this.ProjectService.updateProject(req.body)
      res.json(project)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

module.exports = ProjectRoute
