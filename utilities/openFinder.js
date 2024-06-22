const { exec } = require("child_process");
const os = require("os");
const { adjustWin32Path } = require("./adjustWin32Path");
const { redColor, whiteColor } = require("./colors");

async function openFolder(directoryPath) {
  let command;
  let failMessage = "";

  if (os.platform() === "darwin") { // macOS
    command = `open -g "${directoryPath}"`; // -g flat doesn't switch focus
    successMessage = `${redColor}\nOpened folder ${directoryPath} successfully.${whiteColor}`;
    console.log(successMessage);

  } else if (os.platform() === "win32") { // Windows
    // For Windows OS, modify path and add home directory
    directoryPath = await adjustWin32Path(directoryPath);

    command = `start /b explorer "${directoryPath}"`;

    successMessage = `${redColor}\nOpened folder ${directoryPath} successfully.${whiteColor}`;
    console.log(successMessage);

  } else {
    failMessage = "Unsupported operating system.";
    console.log(failMessage);
    return;
  }

  exec(command, (error, stdout, stderr) => {
    // COMMENTED OUT BECAUSE WINDOWS OS WAS OPENING THE FOLDER BUT STILL ERRORING
    
    let failMessage = "";

    if (error) {
      failMessage = `Error opening folder ${directoryPath}: ${error.message}`;
      console.log(failMessage);
    }
    if (stderr) {
      failMessage = `Error opening folder ${directoryPath}: ${stderr}`;
      console.log(failMessage);
    }
    // console.log(`Opened folder ${directoryPath} successfully.`);
  });
}

// Example usage:
// const directoryPath = '/Google Drive/edX Tutor/file-mover-edx/fullstack-live/01-Class-Content'; // works on windows
// const directoryPath = '/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content'; // works on mac
// async openFolder(directoryPath);

module.exports = {
  openFolder,
};

