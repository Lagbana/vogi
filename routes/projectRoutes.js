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
    this.router.delete('/projects', (req, res) => this.deleteProject(req, res))
    this.router.post(`/projects/newissue`, (req, res) => this.createIssue(req, res))
    this.router.get(`/projects/issues`, (req, res) => this.trackIssues(req, res))

  }

  async createProject (req, res) {
    try {
      // Create project in database
      const newProject = await this.ProjectService.newProject(req.body)
      // Create new repository for each project
      const newRepo = this.GithubService.newRepo(newProject)
      // Create milestone within the repo
      // const {name, description} = req.body
      // this.GithubService.newMilestone(newRepo, name, description)
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

  async deleteProject (req, res) {
    try {
      // Delete repository
      const repo_name = req.body.name
      this.GithubService.deleteRepo(repo_name)

      // Delete project in DB
      const projectID = req.body._id
      const deletedProject = await this.ProjectService.deleteProject({_id: projectID})
      res.json(deletedProject)

    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async createIssue (req, res) {
    try {
      const { repoName, title, body } = req.body
      // const milestone = this.GithubService.new
      const newIssue = this.GithubService.newIssue(repoName, title, body)
      res.json(newIssue)

    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async trackIssues (req, res) {
    try {
      const { repoName } = req.body
      // const milestone = this.GithubService.new
      const newIssue = await this.GithubService.listIssues(repoName)
      res.json(newIssue)

    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = ProjectRoute
