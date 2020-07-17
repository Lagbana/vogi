const passport = require('passport')

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
    this.router.delete('/projects/:id', (req, res) => this.deleteProject(req, res))
    this.router.post(`/projects/newissue`, (req, res) =>
      this.createIssue(req, res)
    )
    this.router.get(`/projects/issues`, (req, res) =>
      this.trackIssues(req, res)
    )
  }

  async createProject (req, res) {
    try {
      const newProject = await this.ProjectService.newProject({
        ...req.body,
        userID: req.user._id
      })

      // Create new repository for each project
      const newRepo = this.GithubService.newRepo(req.body)
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
      const projects = await this.ProjectService.retrieveProjects({
        userID: req.user._id
      })
      res.json(projects)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async deleteProject (req, res) {
    try {
      console.log(req.params)
      const projectID = req.params.id
      const repoName = req.query.repo
   
      // Delete repository
      this.GithubService.deleteRepo(repoName)

      // Delete project in DB
      const deletedProject = await this.ProjectService.deleteProject({
        _id: projectID
      })
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
