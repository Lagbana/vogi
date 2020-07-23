const passport = require('passport')
// Project Route class
class ProjectRoute {
  // Contruct methods from the services
  constructor (options = {}) {
    this.options = options
    this.router = options.Router
    this.ProjectService = new options.ProjectService()
    this.GithubService = new options.GithubService()
  }
  // Initialize the routes from its own methods
  initialize () {
    // Create a new project
    this.router.post('/projects', (req, res) => this.createProject(req, res))
    // Retrieve the projects
    this.router.get('/projects', (req, res) => this.retrieveProjects(req, res))
    // Update a project
    this.router.put('/projects', (req, res) => this.updateProject(req, res))
    // Delete a project
    this.router.delete('/projects/:id', (req, res) =>
      this.deleteProject(req, res)
    )
    // Post an issue
    this.router.post(`/projects/issues`, (req, res) =>
      this.createIssue(req, res)
    )
    // Get all issues
    this.router.get(`/projects/issues`, (req, res) =>
      this.trackIssues(req, res)
    )
  }

  // Creates a new project
  async createProject (req, res) {
    try {
      // Passes in the req.body and the user id to the project service
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

  // Retrieve available projects
  async retrieveProjects (req, res) {
    try {
      // Passes in the user id
      const projects = await this.ProjectService.retrieveProjects({
        userID: req.user._id
      })
      res.json(projects)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  // Deletes a project
  async deleteProject (req, res) {
    try {
      console.log(req.params)
      const projectID = req.params.id
      const repoName = req.query.repo

      // Delete repository
      this.GithubService.deleteRepo(repoName)

      // Delete project in DB
      await this.ProjectService.deleteProject({
        _id: projectID
      })

      // Return the remaining projects
      const projects = await this.ProjectService.retrieveProjects({
        userID: req.user._id
      })

      res.json(projects)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  // Create a new githubissue
  async createIssue (req, res) {
    try {
      // console.log(req.body)
      const { repoName, title, body } = req.body
      // const milestone = this.GithubService.new
      const newIssue = await this.GithubService.newIssue(repoName, title, body)
      console.log(newIssue)
      res.json(newIssue.data.title)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  // Retrieve all the issues
  async trackIssues (req, res) {
    try {
      const repoName = req.query.repo

      // const milestone = this.GithubService.new
      const newIssue = await this.GithubService.listIssues(repoName)
      res.json(newIssue)
    } catch (err) {
      console.error(err)
    }
  }

  // Update a project
  async updateProject (req, res) {
    try {
      // Passes in the req.body to update the project
      const project = await this.ProjectService.updateProject(req.body)
      res.json(project)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

module.exports = ProjectRoute
