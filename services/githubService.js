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
            project_Decription: result.description
          })
        }
      )
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }

  deleteRepo (context) {
    try {
      const repo = this.getRepo(context)
      repo.deleteRepo(function (error, result, request) {
        console.log(result)
        return result
      })
      console.log(repo)
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

  getRepo (repo_Name) {
    const gh = new GitHub({
      username: process.env.GITHUB_USER,
      password: process.env.GITHUB_PASS
    })

    const repo = gh.getRepo('vogiPartner', repo_Name)
    return repo
  }
}

module.exports = GithubService
