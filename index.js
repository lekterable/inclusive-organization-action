const core = require('@actions/core')
const github = require('@actions/github')

const run = async () => {
  try {
    const organization = core.getInput('organization', { required: true })
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

    const { data } = await octokit.repos.listPullRequestsAssociatedWithCommit({
      owner: repository.owner.login,
      repo: repository.name,
      commit_sha: sha,
    })

    const contributor = data[0].user

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
      } catch (error) {
        core.setFailed(error.message)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
