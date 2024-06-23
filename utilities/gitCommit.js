const { exec } = require("child_process");
const path = require("path");
const os = require("os");
const { adjustWin32Path } = require("./adjustWin32Path");

function executeGitCommand(directoryPath, command, message) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(directoryPath);
    const gitCommand = getGitCommand();

    const fullCommand = `${gitCommand} -C "${fullPath}" ${command}`;

    exec(fullCommand, (error, stdout, stderr) => {
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

    const fullPath = path.resolve(directoryPath);
    const branchCommand = `${gitCommand}  -C "${fullPath}" symbolic-ref --short HEAD`;

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
    // Get current branch name
    const currentBranch = await getCurrentBranch(directoryPath);

    console.log(`\n*** STARTING GIT ADD *****`);
    console.log(`*** CURRENT BRANCH = ${currentBranch} ***`);

    const command = `add -A`;
    await executeGitCommand(directoryPath, command, "ADDING CHANGES");

  } catch (error) {
    console.error(error);
  }
}

async function gitCommit(directoryPath, commitMessage) {
  try {
    // Get current branch name
    const currentBranch = await getCurrentBranch(directoryPath);
    
    console.log(`\n*** STARTING GIT COMMIT *****`);
    console.log(`*** CURRENT BRANCH = ${currentBranch} ***`);

    const command = `commit -m "${commitMessage}" --author="${os.userInfo().username} <${os.userInfo().username}@users.noreply.github.com>" --no-verify --allow-empty --no-post-rewrite`;
    await executeGitCommand(directoryPath, command, "COMMITTING CHANGES");

  } catch (error) {
    console.error(error);
  }
}

async function gitPush(directoryPath) {
  try {
    // Get current branch name
    const currentBranch = await getCurrentBranch(directoryPath);
    
    console.log(`\n*** STARTING GIT PUSH *****`);
    console.log(`*** CURRENT BRANCH = ${currentBranch} ***`);

    const command = `push origin ${currentBranch}`;
    await executeGitCommand(directoryPath, command, "PUSHING CHANGES");
  } catch (error) {
    console.error(error);
  }
}

async function gitCheckout(directoryPath, branchName) {

  try {
    // Get current branch name
    const currentBranch = await getCurrentBranch(directoryPath);
    
    console.log(`\n*** STARTING GIT CHECKOUT -b *****`);
    console.log(`*** CURRENT BRANCH = ${currentBranch} ***`);

    const command = `checkout -b ${branchName}`;
    await executeGitCommand(directoryPath, command, "CREATING & SWITCHING TO NEW BRANCH");

    console.log(`\n*** NEW BRANCH CREATED ${branchName}} *****`);
  } catch (error) {
    console.error(error);
  }
}

async function gitAddCommitPush(directoryPath, commitMessage, isCreateNewBranch, newBranchName) {
  // For Windows OS, modify path and add home directory
  if (os.platform() === "win32") { // Windows
    directoryPath = await adjustWin32Path(directoryPath);
  }

  try {
    // add new branch if true
    isCreateNewBranch && await gitCheckout(directoryPath, newBranchName);
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
