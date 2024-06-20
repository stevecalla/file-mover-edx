const { exec } = require("child_process");
const os = require("os");

function openFolder(directoryPath) {
  let command;
  let successMessage = "";
  let failMessage = "";

  if (os.platform() === "darwin") { // macOS
    // command = `open ${directoryPath}`;
    command = `open -g "${directoryPath}"`; // doesn't switch focus
    successMessage = `\nOpened folder ${directoryPath} successfully.`;
    console.log(successMessage);
  } else if (os.platform() === "win32") { // Windows
    // command = `explorer "${directoryPath.replace(/\//g, "\\")}"`;
    command = `start /b explorer "${directoryPath.replace(/\//g, "\\")}"`;
  } else {
    failMessage = "Unsupported operating system.";
    console.log(failMessage);
  }

  // Execute the command
  exec(command, (error, stdout, stderr) => {
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
// const directoryPath = '/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content';
// openFolder(directoryPath);

module.exports = {
  openFolder,
};
