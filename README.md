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

***organization*** - *(required)* name of the organization to which you would like to invite your contributors

***team*** - *(optional)* name of the team within your organization to which you would like to add your contributors

***comment*** - *(optional)* single or multiline *(use yaml syntax)* comment which will be added, when contributor's first PR gets merged

**NOTE:** create a [repository secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) called *`ACCESS_TOKEN`* *(or give it another name, but don't forget to change it in the workflow)* and as a value provide a GitHub [personal access token](https://github.com/settings/tokens) with the scope of *`admin:org`*, if you want to be able to add comments you will also need *`public_repo`* .

## License

[MIT](LICENSE)