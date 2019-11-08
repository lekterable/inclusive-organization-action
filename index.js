const core = require('@actions/core')
const github = require('@actions/github')

const transformTeamName = teamName => teamName.toLowerCase().replace(' ', '-')

const run = async () => {
  try {
    const organization = core.getInput('organization', { required: true })
    const teamName = core.getInput('team')
    const comment = core.getInput('comment')
    const { ACCESS_TOKEN } = process.env

    if (!ACCESS_TOKEN)
      return core.setFailed('ENV required and not supplied: ACCESS_TOKEN')

    const { payload, sha } = github.context
    const { repository } = payload
    const octokit = new github.GitHub(ACCESS_TOKEN)

    const commit = await octokit.git.getCommit({
      owner: repository.owner.login,
      repo: repository.name,
      commit_sha: sha,
    })

    const isMergeCommit = commit.data.parents.length > 1
    if (!isMergeCommit) return

    const {
      data: [pullRequest],
    } = await octokit.repos.listPullRequestsAssociatedWithCommit({
      owner: repository.owner.login,
      repo: repository.name,
      commit_sha: sha,
    })

    const contributor = pullRequest.user

    if (teamName) {
      const team = await octokit.teams.getByName({
        org: organization,
        team_slug: transformTeamName(teamName),
      })

      try {
        await octokit.teams.getMembership({
          team_id: team.data.id,
          username: contributor.login,
        })
      } catch (_) {
        try {
          await octokit.teams.addOrUpdateMembership({
            team_id: team.data.id,
            username: contributor.login,
          })

          if (comment)
            await octokit.issues.createComment({
              owner: repository.owner.login,
              repo: repository.name,
              issue_number: pullRequest.number,
              body: comment,
            })
        } catch (error) {
          core.setFailed(error.message)
        }
      }
    } else {
      try {
        await octokit.orgs.checkMembership({
          org: organization,
          username: contributor.login,
        })
      } catch (_) {
        try {
          await octokit.orgs.createInvitation({
            org: organization,
            invitee_id: contributor.id,
          })

          if (comment)
            await octokit.issues.createComment({
              owner: repository.owner.login,
              repo: repository.name,
              issue_number: pullRequest.number,
              body: comment,
            })
        } catch (error) {
          core.setFailed(error.message)
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
