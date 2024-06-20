const path = require('path');
const os = require('os');

async function adjustWin32Path(directory) {
    // Replace ~ with the user's home directory
    if (os.platform() === "win32") {
        // console.log(contentDirectory);
        directory = path.join(os.homedir(), directory).replace(/\//g, "\\");
        // console.log('contentDirectory', contentDirectory);
        return directory;
    }
}

module.exports = {
    adjustWin32Path,
}