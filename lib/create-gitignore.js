import getTemplateFileContent from "./get-template-file-content.js";
import writePrettyFile from "./write-pretty-file.js";

export default async function createGitIgnore(name) {
  await writePrettyFile(
    "gitignore.md",
    getTemplateFileContent("gitognore.md")
  );
}
