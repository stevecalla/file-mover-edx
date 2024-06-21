const fs = require("fs");
const path = require("path");
const { getFilesAndDirectories } = require("./step_1_readDirectory");

// Function to copy files to a new directory retaining structure
async function copyFilesToDestination(sourceDirectory, destinationDirectory) {
  // Retrieve all files and directories from sourceDirectory
  const { directories, files } = await getFilesAndDirectories(sourceDirectory);

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
  }

  // Iterate through each file and copy to destination directory
  files.forEach(file => {
    const relativePath = path.relative(sourceDirectory, file);
    const destinationFile = path.join(destinationDirectory, relativePath);

    // Create directory structure if it doesn't exist
    const destinationDir = path.dirname(destinationFile);
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Copy file from source to destination
    fs.copyFileSync(file, destinationFile);
    // console.log(`Copied ${file} to ${destinationFile}`);
  });

  // console.log("Files copied successfully!");
}

// Copy files from source to destination while retaining structure
// const { sourceDirectory, destinationDirectory } = require("../../../utilities/directoryLibrary");
// copyFilesToDestination();

module.exports = {
  copyFilesToDestination,
}
