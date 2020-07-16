const GitHub = require('github-api')
const Issue = require('github-api/dist/components/Issue')

const gh = new GitHub({
  username: process.env.GITHUB_USER,
  password: process.env.GITHUB_PASS
})

class GithubService {
  constructor (options = {}) {
    this.options = options
  }

  getOrganization () {
    const Vogi = gh.getOrganization('vogiPartner')
    return Vogi
  }

  getRepo (repo_Name) {
    const repo = gh.getRepo('vogiPartner', repo_Name)
    return repo
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
          //     console.log({
          //       id: result.id,
          //       project_Name: result.name,
          //       repo_URL: result.html_url,
          //       project_Decription: result.description
          //   })
        }
      )
      return context.name
    } catch (err) {
      console.error(err)
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
      console.error(err)
      throw err
    }
  }

  newIssue (repoName, issueTitle, issueBody) {
    try {
      const issue = new Issue(
        `vogiPartner/${repoName}`,
        {
          username: process.env.GITHUB_USER,
          password: process.env.GITHUB_PASS
        },
        'https://api.github.com'
      )
        issue.createIssue(
          {
            title: issueTitle,
            body: issueBody
          },
          function (error, result, request) {
            console.log(result)
          }
        )
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = GithubService
