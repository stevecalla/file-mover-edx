const { exec } = require('child_process');
const path = require('path');
const os = require('os');

function executeGitCommand(directoryPath, command, message) {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(directoryPath);
        const gitCommand = getGitCommand();

        const fullCommand = `${gitCommand} -C "${fullPath}" ${command}`;

        exec(fullCommand, (error, stdout, stderr) => {
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

async function gitPush(directoryPath) {
    try {
        await executeGitCommand(directoryPath, 'push origin HEAD', 'pushing changes');
    } catch (error) {
        console.error(error);
    }
}

async function gitAddCommitPush(directoryPath, commitMessage) {
    try {
        await gitAdd(directoryPath);
        await gitCommit(directoryPath, commitMessage);
        // await gitPush(directoryPath);
    } catch (error) {
        console.error(error);
    }
}

// Example usage:
const directoryPath = '/Users/stevecalla/file-mover-edx/file-mover-edx'; // Replace with your directory path
const commitMessage = 'Initial commit'; // Replace with your commit message
gitAddCommitPush(directoryPath, commitMessage);

// const { exec } = require('child_process');
// const path = require('path');
// const os = require('os');

// function gitAdd(directoryPath) {
//     return new Promise((resolve, reject) => {
//         const fullPath = path.resolve(directoryPath);
//         const gitCommand = getGitCommand();

//         const addCommand = `${gitCommand} -C "${fullPath}" add -A`;
//         const statusCommand = `${gitCommand} -C "${fullPath}" status`;

//         exec(addCommand, (error, stdout, stderr) => {
//             if (error) {
//                 reject(`Error adding files in ${directoryPath}: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 console.warn(`Git add warning in ${directoryPath}: ${stderr}`);
//             }
//             console.log(`Files added successfully in ${directoryPath}.`);

//             exec(statusCommand, (statusError, statusStdout, statusStderr) => {
//                 if (statusError) {
//                     console.error(`Error fetching status in ${directoryPath}: ${statusError.message}`);
//                     return;
//                 }
//                 console.log(`Repository status after add in ${directoryPath}:\n${statusStdout}`);
//                 resolve();
//             });
//         });
//     });
// }

// function gitCommit(directoryPath, commitMessage) {
//     return new Promise((resolve, reject) => {
//         const fullPath = path.resolve(directoryPath);
//         const gitCommand = getGitCommand();

//         const commitCommand = `${gitCommand} -C "${fullPath}" commit -m "${commitMessage}"`;
//         const statusCommand = `${gitCommand} -C "${fullPath}" status`;

//         exec(commitCommand, (error, stdout, stderr) => {
//             if (error) {
//                 reject(`Error committing changes in ${directoryPath}: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 console.warn(`Git commit warning in ${directoryPath}: ${stderr}`);
//             }
//             console.log(`Changes committed successfully in ${directoryPath}.`);

//             exec(statusCommand, (statusError, statusStdout, statusStderr) => {
//                 if (statusError) {
//                     console.error(`Error fetching status in ${directoryPath}: ${statusError.message}`);
//                     return;
//                 }
//                 console.log(`Repository status after commit in ${directoryPath}:\n${statusStdout}`);
//                 resolve();
//             });
//         });
//     });
// }

// function gitPush(directoryPath) {
//     return new Promise((resolve, reject) => {
//         const fullPath = path.resolve(directoryPath);
//         const gitCommand = getGitCommand();

//         const pushCommand = `${gitCommand} -C "${fullPath}" push origin HEAD`;
//         const statusCommand = `${gitCommand} -C "${fullPath}" status`;

//         exec(pushCommand, (error, stdout, stderr) => {
//             if (error) {
//                 reject(`Error pushing changes in ${directoryPath}: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 console.warn(`Git push warning in ${directoryPath}: ${stderr}`);
//             }
//             console.log(`Changes pushed successfully from the current branch in ${directoryPath}.`);

//             exec(statusCommand, (statusError, statusStdout, statusStderr) => {
//                 if (statusError) {
//                     console.error(`Error fetching status in ${directoryPath}: ${statusError.message}`);
//                     return;
//                 }
//                 console.log(`Repository status after push in ${directoryPath}:\n${statusStdout}`);
//                 resolve();
//             });
//         });
//     });
// }

// function getGitCommand() {
//     return os.platform() === 'win32' ? 'git' : '/usr/bin/git'; // Adjust for Windows and macOS/Linux
// }

// async function gitAddCommitPush(directoryPath, commitMessage) {
//     try {
//         await gitAdd(directoryPath);
//         await gitCommit(directoryPath, commitMessage);
//         // await gitPush(directoryPath);
//     } catch (error) {
//         console.error(error);
//     }
// }
