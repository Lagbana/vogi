class VolunteerRoute {
  constructor(options = {}) {
    super()
    this.options = options
    this.router = options.Router
    this.volunteerService = new options.VolunteerService()
  }

  initialize () {
    // Sign up routes
    this.router.get('/login', (req, res) => this.getLoginPage(req, res))

    this.router.post('/signup', (req, res) => this.newLocalUser(req, res))
    this.router.post('/signup/github', (req, res) =>
      this.newgithubuser(req, res)
    )
  }

  async getAllPosts (req, res) {
    try {
      const allPosts = await this.getAllPostsService()
      res.status(200).json(allPosts)
    } catch (err) {
      res.status(404).json(err)
      throw err
    }
  }

  async newPost (req, res) {
    try {
      const newPost = await this.postService.createPostService(req.body)
      res.status(201).json(newPost)
    } catch (err) {
      res.status(404).json(err)
      throw err
    }
  }

  async updatePost (req, res) {
    try {
      const updatedPost = await this.postService.updatePostService(
        req.params.id,
        req.body
      )
      res.status(201).json(updatedPost)
    } catch (err) {
      res.status(404).json(err)
      throw err
    }
  }
}

module.exports = VolunteerRoute
