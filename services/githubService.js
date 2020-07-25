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
      Vogi.createRepo({
        name: context.name,
        description: context.description,
        private: false,
        // private: true,
        // visibility: 'private',
        has_issues: true,
        has_projects: true,
        auto_init: true
      })
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

  async newIssue (repoName, issueTitle, issueBody) {
    try {
      const issue = new Issue(
        `vogiPartner/${repoName}`,
        {
          username: process.env.GITHUB_USER,
          password: process.env.GITHUB_PASS
        },
        'https://api.github.com'
      )
      const newIssue = await issue.createIssue({
        title: issueTitle,
        body: issueBody
      })
      return newIssue
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listIssues (repoName) {
    try {
      const issue = new Issue(
        `vogiPartner/${repoName}`,
        {
          username: process.env.GITHUB_USER,
          password: process.env.GITHUB_PASS
        },
        'https://api.github.com'
      )
      const response = await issue.listIssues({
        state: 'all'
      })
      const array = response.data
      let closedIssues = 0
      const issues = array.map(context => {
        if (context.state === 'closed') closedIssues++
        let data = {}
        data['title'] = context.title
        data['body'] = context.body
        data['state'] = context.state
        return data
      })

      const progress = {
        closedIssues: closedIssues,
        totalIssues: issues.length
      }
      return [issues, progress]
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  //   async newMilestone (repoName, title, body) {
  //     try {
  //       const issue = new Issue(
  //         `vogiPartner/${repoName}`,
  //         {
  //           username: process.env.GITHUB_USER,
  //           password: process.env.GITHUB_PASS
  //         },
  //         'https://api.github.com'
  //       )
  //       const newMilestone = await issue.createMilestone({
  //         title: title,
  //         description: body
  //       })
  //     } catch (err) {
  //       console.error(err)
  //       throw err
  //     }
  //   }
}

module.exports = GithubService
