const { capitalizeFirstCharacter, lowerCase, isNumber, isEmail, isBlank } = require("../../../lib/util");

const questionContentDirectory = [
  {
    prefix: "⠋🟡 1)",
    type: "input",
    name: "contentDirectory",
    message: `\u001b[0;1mEnter the \x1b[36;1mCLASS CONTENT\u001b[0;1m directory?`,
    default: "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "first name");
    },
  },
];

const questionDirectoryToCopy = (directories) => [
  {
    prefix: "\n⠋🟡 2)",
    type: "rawlist",
    name: "directoryToCopy",
    message: "Please select the directory to copy \x1b[36;1mDIRECTORY TO COPY\u001b[0;1m?",
    choices: directories,
    suffix: " 🟡",
  },
];

const questionsDestinationPath = [
  // SECTION GET DESTINATION DIRECTORY
  {
    prefix: "\n⠋🟡 3)",
    type: "input",
    name: "destinationPath",
    message: `\u001b[0;1mEnter the \x1b[36;1mDESTINATION\u001b[0;1m directory?`,
    default: "/Users/stevecalla/file-mover-edx/01-Class-Content-Destination",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "last name");
    },
  },  
  // SECTION DELETE SOLVED FOLDERS
  {
    prefix: "\n⠋🟡 4)",
    type: "confirm",
    name: "deleteSolvedAllFolders",
    message: `SOLVED FOLDERS:\n       - Would you like to delete \x1b[36;1mSOLVED - All Folders\u001b[0;1m?`,
    default: "true",
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity01To10",
    message: `       - Would you like to delete \x1b[36;1mSOLVED - ACTIVITIES 01 to 10\u001b[0;1m?`,
    default: "false",
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity11To20",
    message: `       - Would you like to delete \x1b[36;1mSOLVED - ACTIVITIES 11 to 20\u001b[0;1m?`,
    default: "false",
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity21To28",
    message: `       - Would you like to delete \x1b[36;1mSOLVED - ACTIVITIES 21 to 28\u001b[0;1m?`,
    default: "false",
    suffix: " 🟡",
  },
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInAlgorithmFolder",
    message: `       - Would you like to delete \x1b[36;1mSOLVED - ALGORITHM folder\u001b[0;1m?`,
    default: "true",
    suffix: " 🟡",
  },
  // SECTION DELETE MAIN FOLDERS
  {
    prefix: "\n⠋🟡 5)",
    type: "confirm",
    name: "deleteMainAllFolders",
    message: `MAIN FOLDERS:\n       - Would you like to delete \x1b[36;1mMAIN - All Folders?\u001b[0;1m?`,
    default: "true",
    suffix: " 🟡",
  },   
  {
    prefix: "",
    type: "confirm",
    name: "deleteMainInChallengeFolder",
    message: `       - Would you like to delete \x1b[36;1mMAIN - CHALLENGE Folder\u001b[0;1m?`,
    default: "true",
    suffix: " 🟡",
  }
];

const questionsContinue = [
  {
    prefix: "\n⠋🟡 6)",
    type: "confirm",
    name: "isContinue",
    message: `Would you like to \x1b[36;1mCOPY & DELETE per the SELECTIONS\u001b[0;1m?`,
    default: "true",
    suffix: " 🟡",
  },
];

module.exports = {
  questionContentDirectory,
  questionDirectoryToCopy,
  questionsDestinationPath,
  questionsContinue,
};
