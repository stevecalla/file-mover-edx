const path = require('path');
const os = require('os');

// For Windows OS, modify path and add home directory
async function adjustWin32Path(directory) {
    if (os.platform() === "win32") {
        directory = path.join(os.homedir(), directory).replace(/\//g, "\\");
        return directory;
    }
    return directory;
}

module.exports = {
    adjustWin32Path,
}