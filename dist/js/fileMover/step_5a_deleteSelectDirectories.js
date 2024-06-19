const fs = require("fs");
const path = require("path");

async function deleteSelectDirectories(directoryPath, directoryToDelete, matchPattern) {
  try {
    // Read the contents of the directory
    const contents = fs.readdirSync(directoryPath);
    console.log('directory path = ', directoryPath);
    console.log('contents = ', contents);

    // Iterate through each item in the directory
    contents.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      console.log('item = ', item);

      // Check if the item is a directory
      if (fs.statSync(itemPath).isDirectory()) {
        // Check if the directory starts with the match pattern
        if (item.match(matchPattern)) {
          // Recursively delete 'Solved' directories within this directory
          deleteSelectDirectories(itemPath, directoryToDelete, matchPattern);
        }
      }

      // Check if the item is a directory named 'Solved'
      if (
        fs.statSync(itemPath).isDirectory() &&
        item.toLowerCase() === directoryToDelete.toLowerCase()
      ) {
        // Recursively delete the directory and its contents
        deleteFolderRecursive(itemPath);
      }
    });

    console.log(`${directoryToDelete} directories deleted successfully!`);
  } catch (error) {
    console.error(`Error deleting ${directoryToDelete} directories: ${error}`);
  }
}

// Recursive function to delete a directory and its contents
function deleteFolderRecursive(folderPath) {
  console.log(folderPath);
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recurse into subdirectories
        deleteFolderRecursive(curPath);
      } else {
        // Delete files
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath); // Delete empty directory
  }
}

// Example usage:
// deleteSolvedDirectories(destinationDirectory, matchPattern);

module.exports = {
  deleteSelectDirectories,
}
