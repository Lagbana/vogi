// Bundle up all of the services and export them
module.exports = {
  AuthService: require('./authService'),
  UserService: require('./userService'),
  ProjectService: require('./projectService'),
  GithubService: require('./githubService')
}
