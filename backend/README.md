# Backend

this Project was scaffolded By Nestjs.

this application serve a Restfull API,using File storage to save ,edit and get the data on a file located on `/opt/myapp/repo/settings.yaml` ,a git repository will be initialised on the that folder in order to be able to use Git tool to manage the versioning.

## Tools

- `simple-git`: A lightweight interface for running git commands in any node.js application.
link to [NPM package simple-git](https://www.npmjs.com/package/simple-git)

- `yaml`: yaml is a definitive library for YAML, the human friendly data serialization standard.
link to [NPM package YAML](https://www.npmjs.com/package/yaml)

## Api

- `GET '/data'`: endpoint to get the Data (JSON format).in one step using file system API 'ReadFile' to read the file and parse it from Yaml to JSON format and serve it.

- `POST '/data'`: endpoint to save the incoming Data (JSON format).in two step using File system Api 'writeFile' and parsing the data into yaml format we store the data in the file. after that using the Git Add + git commit  commands in order to stage the data and record the changes for that particular file,author attached with message or comment.
`git config user.name {{author}} && git config user.name "{{author}}@foobarz.blogauthor"`
`git add . && git commit -m {{commitMessage}}`

- `GET '/commit-history'`: endpoint to get the list of commit history.in one step using Git Log command to get the commit history.the list can be huge thus we can filter the result by (max-count,skip)for pagination ,(-- filename) to get only the changes for that file.

`git log --max-count={{size}} --skip{{(page - 1) * size}} -- {{filename}}`

- `GET '/data/:commitHash'`: endpoint to get the changes only related to a commit Hash in `git Diff Style`. using Git show command with prettier and specified file.

`git show {{commitHash}} --pretty=format:%b -- {{filename}}`
