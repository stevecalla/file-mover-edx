const { exec } = require("child_process");
const path = require("path");
const os = require("os");
const { adjustWin32Path } = require("./adjustWin32Path");

function executeGitCommand(directoryPath, command, message) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(directoryPath);
    const gitCommand = getGitCommand();

    const fullCommand = `${gitCommand} -C "${fullPath}" ${command}`;
    // console.log(fullCommand);

    exec(fullCommand, (error, stdout, stderr) => {
      // console.log("stdout = ", stdout);
      if (error) {
        reject(`Error: ${message} in ${directoryPath}: ${error.message}`);
        return;
      }
      if (stderr) {
        console.warn(
          `Warning: Git ${message} warning in ${directoryPath}: ${stderr}`
        );
      }
      console.log(`${message} successfully in ${directoryPath}.`);

      // Fetch and log repository status
      fetchAndLogStatus(directoryPath)
        .then(() => resolve())
        .catch((statusError) => reject(statusError));
    });
  });
}

async function getCurrentBranch(directoryPath) {
  return new Promise((resolve, reject) => {
    const gitCommand = getGitCommand();
    const branchCommand = `${gitCommand} symbolic-ref --short HEAD`;
    console.log('current branch ', branchCommand);

    exec(branchCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error getting current branch in ${directoryPath}: ${error.message}`);
        return;
      }
      const currentBranch = stdout.trim();
      resolve(currentBranch);
    });
  });
}

function fetchAndLogStatus(directoryPath) {
  return new Promise((resolve, reject) => {
    // Get current branch name
    getCurrentBranch(directoryPath)
      .then(currentBranch => {
        const gitCommand = getGitCommand();
        const statusCommand = `${gitCommand} -C "${directoryPath}" status`;

        exec(statusCommand, (statusError, statusStdout, statusStderr) => {
          if (statusError) {
            reject(`Error fetching status in ${directoryPath}: ${statusError.message}`);
            return;
          }

          // Log repository status and current branch
          console.log(`Repository status in ${directoryPath} (Branch: ${currentBranch}):\n${statusStdout}`);
          resolve();
        });
      })
      .catch(error => {
        reject(`Error getting current branch in ${directoryPath}: ${error}`);
      });
  });
}

function getGitCommand() {
  return os.platform() === "win32" ? "git" : "/usr/bin/git"; // Adjust for Windows and macOS/Linux
}

async function gitAdd(directoryPath) {
  try {
    await executeGitCommand(directoryPath, "add -A", "adding files");
  } catch (error) {
    console.error(error);
  }
}

async function gitCommit(directoryPath, commitMessage) {
  try {
    // Get current branch name
    const currentBranch = await getCurrentBranch(directoryPath);
    console.log('current branch 2 = ', currentBranch);

    await executeGitCommand(
      directoryPath,
      `commit -m "${commitMessage}" --author="${os.userInfo().username} <${os.userInfo().username}@users.noreply.github.com>" --no-verify --allow-empty --no-post-rewrite`,
      "committing changes"
    );
  } catch (error) {
    console.error(error);
  }
}

async function gitPush(directoryPath) {
  try {
    // Get current branch name
    const currentBranch = await getCurrentBranch(directoryPath);

    await executeGitCommand(
      directoryPath,
      `push origin ${currentBranch}`,
      "pushing changes"
    );
  } catch (error) {
    console.error(error);
  }
}

async function gitAddCommitPush(directoryPath, commitMessage) {
  // console.log(directoryPath);
  // Replace ~ with the user's home directory; modify file path
  if (os.platform() === "win32") { // Windows
    directoryPath = await adjustWin32Path(directoryPath);
  }
  // console.log(directoryPath);

  try {
    await gitAdd(directoryPath);
    await gitCommit(directoryPath, commitMessage);
    await gitPush(directoryPath);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

// Example usage:
// const directoryPath = "/Users/stevecalla/file-mover-edx/file-mover-edx"; // mac
// const directoryPath = '/Google Drive/edX Tutor/file-mover-edx/fullstack-live/01-Class-Content'; // windows
// const commitMessage = "Initial commit"; // Replace with your commit message
// gitAddCommitPush(directoryPath, commitMessage);

module.exports = {
  gitAddCommitPush,
}
