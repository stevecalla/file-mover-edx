const path = require('path');
const os = require('os');

async function adjustWin32Path(directory) {
    // Replace ~ with the user's home directory; modify file path
    if (os.platform() === "win32") {
        // console.log(directory)
        directory = path.join(os.homedir(), directory).replace(/\//g, "\\");
        // console.log(directory);
        return directory;
    }
}

module.exports = {
    adjustWin32Path,
}