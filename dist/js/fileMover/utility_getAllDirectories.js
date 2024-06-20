const fs = require('fs');
const path = require('path');
// const { contentDirectory } = require("./step_0_defineDirectories");

function getAllDirectories(contentDirectory) {
    try {
        // Read the contents of the directory
        const contents = fs.readdirSync(contentDirectory);

        // Initialize an array to store directories
        let directories = [];

        // Iterate through each item in the directory
        contents.forEach(item => {
            const itemPath = path.join(contentDirectory, item);

            // Check if the item is a directory
            if (fs.statSync(itemPath).isDirectory()) {
                directories.push(itemPath);
            }
        });

        return directories;
    } catch (error) {
        console.error(`Error reading contents of directory ${contentDirectory}: ${error}`);
        return [];
    }
}

// Example usage:
// const directories = getAllDirectories();
// console.log('Directories:', directories);

module.exports = {
  getAllDirectories,
}
