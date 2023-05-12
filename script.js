import createGitIgnore from "./lib/create-gitignore.js";

/**
 * Add .gitignore template file to repository
 *
 * @param {import('@octoherd/cli').Octokit} octokit
 * @param {import('@octoherd/cli').Repository} repository
 *
 */

/**
 * Create a .gitinore file unless it already exists.
 * Ignores forks and archived repositories
*/

export async function script(octokit, repository, { path = ".gitignore" }) {
  if (repository.archived) {
    octokit.log.info(`${repository.html_url} is archived, ignoring.`);
    return;
  }

  const owner = repository.owner.login;
  const repo = repository.name;

  const sha = await octokit
    .request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path,
    })
    .then(
      (response) => response.data.sha,
      (error) => null
    );

  if (!sha) {
    octokit.log.info(`${path} does not exist in ${repository.html_url} Creating .gitignore file from template.`);
    await createGitIgnore({
      name: path
    });
    await command("git add .gitignore");
    await command(`git commit -m "docs(.gitignore): initial version"`);
    console.log(`.gitignore created`);

    return;
  }
  else {
    octokit.log.info(`${path} does exist in ${repository.html_url}`);
  }

  octokit.log.info(
    `${path} created in ${repository.html_url} via ${commit.html_url}`
  );
}
