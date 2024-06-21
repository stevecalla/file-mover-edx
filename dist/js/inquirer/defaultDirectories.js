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

// SECTION FILE PATH OPTIONS FOR TESTING CONTENT IF NECESSARY
const filePath = [
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/01-HTML-Git-CSS",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/02-Advanced-CSS",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/03-JavaScript",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/04-Web-APIs",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/05-Third-Party-APIs",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/06-Server-Side-APIs",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/07-Project-1",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/08-Project-1-Contd",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/09-NodeJS",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/10-OOP",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/11-Express",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/12-SQL",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/13-ORM",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/14-MVC",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/15-Project-2",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/16-Project-2-Contd",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/17-CS",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/18-NoSQL",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/19-PWA",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/20-React",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/21-MERN",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/22-State",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/23-Project-3",
  "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/24-Project-3-Contd",
];

module.exports = {
  defaultContentDirectory,
  defaultDestinationDirectory,
}