const { exec } = require("child_process");
const path = require("path");
const os = require("os");
const { adjustWin32Path } = require("./adjustWin32Path");

// SECTION DESTINATION DIRECTORY
const defaultDestinationDirectoryMacOSTesting = "/Users/stevecalla/file-mover-edx/01-Class-Content-Destination";

const defaultDestinationDirectoryMacOs = "/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

const defaultDestinationDirectoryWindowsOS = "/Google Drive/edX Tutor/file-mover-edx/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

const defaultDestinationDirectory = os.platform() === "win32" ? defaultDestinationDirectoryWindowsOS : defaultDestinationDirectoryMacOs;

const fullPath1 = path.resolve(defaultDestinationDirectoryMacOSTesting);
const fullPath2 = path.resolve(defaultDestinationDirectoryMacOs);
const fullPath3 = path.resolve(defaultDestinationDirectoryWindowsOS);
const fullPath4 = path.resolve(defaultDestinationDirectory);

const userInfo = os.userInfo();
const platform = os.platform();

console.log('mac testing = ',fullPath1);
console.log('macOs testing = ', fullPath2);
console.log('windowsOs testing = ', fullPath3);
console.log('os platform testing = ', fullPath4);
console.log(userInfo);
console.log(platform);

async function getCurrentBranch(directoryPath) {
  return new Promise((resolve, reject) => {
    // const gitCommand = getGitCommand();
    // const branchCommand = `/usr/bin/git symbolic-ref --short HEAD`;

    let gitCommand = `/usr/bin/git`;
    
    const test = "/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";
    const fullPath1 = path.resolve(test);

    // let command = `symbolic-ref --short HEAD`;
    let command = 'status';
    
    const fullCommand = `${gitCommand} -C "${fullPath1}" ${command}`;
    
    console.log('current branch ', fullCommand);
    
    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        reject(`Error getting current branch in ${directoryPath}: ${error.message}`);
        return;
      }
      console.log('branch = ', stdout.trim());
      const currentBranch = stdout.trim();
      resolve(currentBranch);
    });
  });
}

getCurrentBranch();