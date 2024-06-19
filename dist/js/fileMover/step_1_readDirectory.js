const fs = require("fs");
const path = require("path");

// Function to recursively get all files and directories
function getFilesAndDirectories(sourceDirectory) {
  try {
    // Read the contents of the directory
    const contents = fs.readdirSync(sourceDirectory);

    // Initialize arrays to store directories and files
    let directories = [];
    let files = [];

    // Iterate through each item in the directory
    for (let i = 0; i < contents.length; i++) {
      const itemPath = path.join(sourceDirectory, contents[i]);

      // Check if the item is a directory
      if (fs.statSync(itemPath).isDirectory()) {
        // Recursively get files and directories in nested directory
        const nestedContents = getFilesAndDirectories(itemPath);

        // Add nested directories to the list
        directories = directories.concat(nestedContents.directories);

        // Add nested files to the list
        files = files.concat(nestedContents.files);
      } else {
        // It's a file, add it to the files array
        files.push(itemPath);
      }
    }

    return { directories, files };
  } catch (error) {
    console.error(`Error reading contents of directory ${sourceDirectory}: ${error}`);
    return { directories: [], files: [] };
  }
}

module.exports = {
  getFilesAndDirectories,
}
