const os = require('os');

// SECTION CONTENT DIRECTORY
const defaultContentDirectoryMacOS = "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content";

const defaultContentDirectoryWindowsOS = "/Google Drive/edX Tutor/file-mover-edx/fullstack-live/01-Class-Content";

const defaultContentDirectory = os.platform() === "win32" ? defaultContentDirectoryWindowsOS : defaultContentDirectoryMacOS;

// SECTION DESTINATION DIRECTORY
const defaultDestinationDirectoryMacOSTesting = "/Users/stevecalla/file-mover-edx/01-Class-Content-Destination";

const defaultDestinationDirectoryMacOs = "/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

const defaultDestinationDirectoryWindowsOS = "/Google Drive/edX Tutor/file-mover-edx/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

const defaultDestinationDirectory = os.platform() === "win32" ? defaultDestinationDirectoryWindowsOS : defaultDestinationDirectoryMacOs;

module.exports = {
  defaultContentDirectory,
  defaultDestinationDirectory,
}