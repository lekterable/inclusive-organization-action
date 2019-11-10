# 💌 Inclusive Organization

Invite contributors to your GitHub organization when their first PR gets merged, to make them feel welcome and included.

## Usage

```yaml
name: Inclusive Organization
on:
  push:
    branches: master
jobs:
  invite:
    runs-on: ubuntu-latest
    steps:
      - name: Invite contributor to the organization
        uses: lekterable/inclusive-organization-action@v1.1.0
        with:
          organization: your-organization-name
          team: your-team-name
          comment: Single or multiline comment
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```

**_organization_** - _(required)_ name of the organization to which you would like to invite your contributors

**_team_** - _(optional)_ name of the team within your organization to which you would like to add your contributors

**_comment_** - _(optional)_ single or multiline _(use yaml syntax)_ comment which will be added, when contributor's first PR gets merged

**NOTE:** create a [repository secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) called _`ACCESS_TOKEN`_ _(or give it another name, but don't forget to change it in the workflow)_ and as a value provide a GitHub [personal access token](https://github.com/settings/tokens) with the scope of _`admin:org`_, if you want to be able to add comments you will also need _`public_repo`_ .

## License

[MIT](LICENSE)
