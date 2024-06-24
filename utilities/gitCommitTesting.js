const { exec } = require("child_process");
const path = require("path");
const os = require("os");
const { adjustWin32Path } = require("./adjustWin32Path");

// SECTION DESTINATION DIRECTORY
const defaultDestinationDirectoryMacOSTesting =
  "/Users/stevecalla/file-mover-edx/01-Class-Content-Destination";

const defaultDestinationDirectoryMacOs =
  "/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

let defaultDestinationDirectoryWindowsOS =
  "/Google Drive/edX Tutor/file-mover-edx/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

const defaultDestinationDirectory =
  os.platform() === "win32"
    ? defaultDestinationDirectoryWindowsOS
    : defaultDestinationDirectoryMacOs;

const fullPath_1 = path.resolve(defaultDestinationDirectoryMacOSTesting);
const fullPath_2 = path.resolve(defaultDestinationDirectoryMacOs);
const fullPath_3 = path.resolve(defaultDestinationDirectoryWindowsOS);
const fullPath_4 = path.resolve(defaultDestinationDirectory);

const userInfo = os.userInfo();
const platform = os.platform();

// REVIEW THE RESOLVED PATHS
// WINDOWS RESOLVE WORKS BUT THE PATH ISN'T COMPLETE; IT NEEDS THE os.userInfo()...
// ... APPENDED AT THE START PER THE adjustwin32path FUNCTION
console.log("mac testing = ", fullPath_1);
console.log("macOs testing = ", fullPath_2);
console.log("windowsOs testing = ", fullPath_3);
console.log("os platform testing = ", fullPath_4);
console.log(userInfo);
console.log(platform);

// REVIEW CURRENT BRANCH
// NEEDED TO ADD THE testPath_1 TO THE COMMAND
// NEED TO ADD THE adjustwin32path TO THE WINDOWS OS PATH
async function getCurrentBranch() {
  defaultDestinationDirectoryWindowsOS = await adjustWin32Path(
    defaultDestinationDirectoryWindowsOS
  );

  return new Promise((resolve, reject) => {
    // const gitCommand = getGitCommand();
    // const branchCommand = `/usr/bin/git symbolic-ref --short HEAD`;

    let gitCommand = os.platform() === "win32" ? `git` : `/usr/bin/git`;

    const test =
      os.platform() === "win32"
        ? defaultDestinationDirectoryWindowsOS
        : defaultDestinationDirectoryMacOs;
    const testPath_1 = path.resolve(test);

    // let command = `symbolic-ref --short HEAD`;
    let command = "status";

    const fullCommand = `${gitCommand} -C "${testPath_1}" ${command}`;

    console.log("current branch ", fullCommand);

    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error getting current branch in ${test}: ${error.message}`);
        return;
      }
      console.log("branch = ", stdout.trim());
      const currentBranch = stdout.trim();
      resolve(currentBranch);
    });
  });
}

// getCurrentBranch();

// REVIEW GIT CHECKOUT FUNCTION
async function gitCheckout(newBranch) {
  defaultDestinationDirectoryWindowsOS = await adjustWin32Path(defaultDestinationDirectoryWindowsOS);
  const test = os.platform() === "win32" ? defaultDestinationDirectoryWindowsOS : defaultDestinationDirectoryMacOs;
  const testPath_1 = path.resolve(test);

  const currentBranch = await getCurrentBranch(defaultDestinationDirectory);

  return new Promise((resolve, reject) => {
    try {
      
      // Get current branch name
      // const currentBranch = await getCurrentBranch(directoryPath);

      console.log(`\n*** STARTING GIT CHECKOUT -b *****`);
      console.log(`*** CURRENT BRANCH = ${currentBranch} ***`);

      let gitCommand = os.platform() === "win32" ? `git` : `/usr/bin/git`;
      const command = `checkout -b ${newBranch}`;
      
      const fullCommand = `${gitCommand} -C "${testPath_1}" ${command}`;

      console.log("full exec command ", fullCommand);

      exec(fullCommand, (error, stdout, stderr) => {
        if (error) {
          reject(`Error getting current branch in ${testPath_1}: ${error.message}`);
          return;
        }
        console.log("branch = ", stdout.trim());
        const currentBranch = stdout.trim();
        resolve(currentBranch);
      });

      console.log(`\n*** NEW BRANCH CREATED ${newBranch}} *****`);
    } catch (error) {
      console.error(error);
    }
  });
}

gitCheckout("test-v13");
