
We will be using NestJs, which is a Node.js framework, and getting started with Nest CLI to scaffold the project and generate some boilerplate code

-  controller class to define REST API Routing.
-  service class to handle the Requests and Logics

### Design our  Rest API Endpoints


* **GET /data**: the endpoint to get the Data in YAML format .by reading the file "setting.yaml" in the repos

* **POST /data**: endpoint to save the data using File system Api 'writeFile' to the file path after that using the Git Commands in this order. `git add .` to stage the changes of the file , `git commit`  to record the changes staged for the file along with some meta data like the **author** ,**comment** and **timestamps** .

```
  async saveData(saveDataDto: SaveDataDto) {
    const { data, commitMessage, author } = saveDataDto;

    await writeFile(getFilePath(), data);
    await this.git.addConfig('user.name', author || 'unkown');
    await this.git.addConfig('user.email', `${author}@foobarz.blog`);

    await this.git.add('.');
    await this.git.commit(commitMessage);

    return data;
  }
```


* **GET /commit-history**: endpoint to get the list of git commit history of the file with pagination 

```
async getCommitHistory(pagination: GetHistoryPaginationDto) {
    const {
      size = 10,
      page = 1,
    } = pagination;

    const query: string[] = []; // we can combine multiple queries like grep ,since ,after,author ect 
    const fileName = getFilePath()

    const { total: totalCount } = await this.git.log<DefaultLogFields>([
      ...query,
      '--',
      fileName,
    ]);

    const { all: commits, total: pageLength } =
      await this.git.log<DefaultLogFields>([
        `--max-count=${size}`,
        `--skip=${(page - 1) * size}`,
        ...query,
        '--',
        fileName,
      ]);

    const maxPages = Math.ceil(totalCount / size);

    return {
      items: commits,
      pageLength: pageLength,
      page: page,
      maxPages: maxPages,
      size: size,
      totalCount,
    };
  }
```

* **GET /data/:commitHash**: the endpoint to get the  file,changes,author and the comment linked to a commit hash.


```

  async getChangesAndDataStateByCommit(commitHash: string) {
    try {
      const pathfileName = getFilePath();

      const data = await this.git.show([`${commitHash}:${FileName}`]);
      const changes = await this.git.show([commitHash, '--pretty=format:%b', '--', pathfileName]);

    const { all: commits } =
    await this.git.log<DefaultLogFields>([
      `--max-count=1`,
      commitHash,
      '--',
      pathfileName,
    ]);

      const author = commits[0].author_name
      const subject = commits[0].message

      return { data, changes ,author,subject}
    } catch (error) {
      throw new Error(error.message);
    }
  }
```
