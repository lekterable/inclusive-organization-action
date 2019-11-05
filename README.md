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
        uses: lekterable/inclusive-organization-action@v1.0.0
        with:
          organization: your-organization-name
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```
**NOTE:** replace *`your-organization-name`* with the name of the organization you want to invite contributors to and create a [repository secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) called *`ACCESS_TOKEN`* and as a value provide a GitHub [personal access token](https://github.com/settings/tokens) with the scope of *`admin:org`*.

## License

[MIT](LICENSE)