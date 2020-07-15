const Organization = require('github-api')
const GitHub = require('github-api')

class GithubService {
  constructor (options = {}) {
    this.options = options
  }

  newRepo (context) {
    try {
      const Vogi = this.getOrganization()
      Vogi.createRepo(
        {
          name: context.name,
          description: context.description,
          private: true,
          visibility: 'private',
          has_issues: true,
          has_projects: true,
          auto_init: true
        },
        function (error, result, request) {
          console.log({
            id: result.id,
            project_Name: result.name,
            repo_URL: result.html_url,
            project_Decription: result.description,
          })
        }
      )
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }

  getOrganization () {
    const gh = new GitHub({
      username: process.env.GITHUB_USER,
      password: process.env.GITHUB_PASS
    })

    const Vogi = gh.getOrganization('vogiPartner')
    return Vogi
  }
}

module.exports = GithubService
