const fs = require("fs");
const path = require("path");

async function deleteAllDirectories(directoryPath, directoryToDelete) {
  try {
    // Read the contents of the directory
    const contents = fs.readdirSync(directoryPath);

    // Iterate through each item in the directory
    contents.forEach((item) => {
      const itemPath = path.join(directoryPath, item);

      // Check if the item is a directory
      if (fs.statSync(itemPath).isDirectory()) {
        // Recursively delete Main directories within this directory
        deleteAllDirectories(itemPath, directoryToDelete);
      }

      // Check if the item is a directory named 'main' or 'solved'
      if (
        fs.statSync(itemPath).isDirectory() &&
        item.toLowerCase() === directoryToDelete.toLowerCase()
      ) {
        // Recursively delete the directory and its contents

        // console.log(`Item to delete ${itemPath}`);
        deleteFolderRecursive(itemPath);
      }
    });

    // After processing all items, check if the current directory itself needs to be deleted
    if (
      fs.statSync(directoryPath).isDirectory() &&
      path.basename(directoryPath).toLowerCase() === directoryToDelete.toLowerCase()
    ) {
      deleteFolderRecursive(directoryPath);
    }

    // console.log(`${directoryToDelete} directories deleted successfully!`);
  } catch (error) {
    // console.error(`Error deleting ${directoryToDelete} directories: ${error}`);
  }
}

// Recursive function to delete a directory and its contents
function deleteFolderRecursive(folderPath) {
  // console.log(`Path to delete ${folderPath}`);
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

module.exports = {
  deleteAllDirectories,
}
