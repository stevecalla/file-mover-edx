const { exec } = require('child_process');
const path = require('path');
const os = require('os');

function executeGitCommand(directoryPath, command, message) {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(directoryPath);
        const gitCommand = getGitCommand();

        const fullCommand = `${gitCommand} -C "${fullPath}" ${command}`;
        console.log(fullCommand);

        exec(fullCommand, (error, stdout, stderr) => {
          console.log('stdout = ', stdout);
            if (error) {
                reject(`Error ${message} in ${directoryPath}: ${error.message}`);
                return;
            }
            if (stderr) {
                console.warn(`Git ${message} warning in ${directoryPath}: ${stderr}`);
            }
            console.log(`${message} successfully in ${directoryPath}.`);

            // Fetch and log repository status
            fetchAndLogStatus(directoryPath)
                .then(() => resolve())
                .catch((statusError) => reject(statusError));
        });
    });
}

function fetchAndLogStatus(directoryPath) {
    return new Promise((resolve, reject) => {
        const gitCommand = getGitCommand();
        const statusCommand = `${gitCommand} -C "${directoryPath}" status`;

        exec(statusCommand, (statusError, statusStdout, statusStderr) => {
            if (statusError) {
                reject(`Error fetching status in ${directoryPath}: ${statusError.message}`);
                return;
            }
            console.log(`Repository status in ${directoryPath}:\n${statusStdout}`);
            resolve();
        });
    });
}

function getGitCommand() {
    return os.platform() === 'win32' ? 'git' : '/usr/bin/git'; // Adjust for Windows and macOS/Linux
}

async function gitAdd(directoryPath) {
    try {
        await executeGitCommand(directoryPath, 'add -A', 'adding files');
    } catch (error) {
        console.error(error);
    }
}

async function gitCommit(directoryPath, commitMessage) {
    try {
        await executeGitCommand(directoryPath, `commit -m "${commitMessage}"`, 'committing changes');
    } catch (error) {
        console.error(error);
    }
}

// async function gitPush(directoryPath) {
//     try {
//         await executeGitCommand(directoryPath, `push origin HEAD`, 'pushing changes');
//     } catch (error) {
//         console.error(error);
//     }
// }

async function gitPush(directoryPath) {
  try {
      const pushOutput = await executeGitCommand(directoryPath, 'push origin HEAD', 'pushing changes');
      return pushOutput; // Return the output from executeGitCommand
  } catch (error) {
      console.error(error);
  }
}

async function gitAddCommitPush(directoryPath, commitMessage) {
    try {
        await gitAdd(directoryPath);
        await gitCommit(directoryPath, commitMessage);

        // await gitPush(directoryPath);

        const pushOutput = await gitPush(directoryPath);
        if (pushOutput) {
            console.log(`Push message from GitHub: ${pushOutput}`);
        } else {
            console.log('No push message from GitHub.'); // Handle case where output is undefined or empty
        }

    } catch (error) {
        console.error(error);
    }
}

// Example usage:
const directoryPath = '/Users/stevecalla/file-mover-edx/file-mover-edx'; // Replace with your directory path
const commitMessage = 'Initial commit'; // Replace with your commit message
gitAddCommitPush(directoryPath, commitMessage);