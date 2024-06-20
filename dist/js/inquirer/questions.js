const { isBlank } = require("../../../utilities/util");
const { blueColor, greenColor, redColor, whiteColor } = require("../../../utilities/colors");

const questionContentDirectory = [
  {
    prefix: "⠋🟡 1)",
    type: "input",
    name: "contentDirectory",
    message: `${whiteColor}Enter the ${blueColor}CLASS CONTENT${whiteColor} directory?${redColor}`,
    default: "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "Class Content Directory");
    },
  },
];

const questionDirectoryToCopy = (directories) => [
  {
    prefix: "\n⠋🟡 2)",
    type: "rawlist",
    name: "directoryToCopy",
    message: "Please select the directory to copy ${blueColor}DIRECTORY TO COPY${whiteColor}?",
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
    message: `${whiteColor}Enter the ${blueColor}DESTINATION${whiteColor} directory?`,
    default: "/Users/stevecalla/file-mover-edx/01-Class-Content-Destination",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "Destination Directory");
    },
  },  
  // SECTION DELETE SOLVED FOLDERS
  {
    prefix: "\n⠋🟡 4)",
    type: "confirm",
    name: "deleteSolvedAllFolders",
    message: `SOLVED FOLDERS:\n       - Would you like to delete ${blueColor}SOLVED - All Folders${whiteColor}?`,
    default: true,
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity01To10",
    message: `       - Would you like to delete ${blueColor}SOLVED - ACTIVITIES 01 to 10${whiteColor}?`,
    default: false,
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity11To20",
    message: `       - Would you like to delete ${blueColor}SOLVED - ACTIVITIES 11 to 20${whiteColor}?`,
    default: false,
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity21To28",
    message: `       - Would you like to delete ${blueColor}SOLVED - ACTIVITIES 21 to 28${whiteColor}?`,
    default: false,
    suffix: " 🟡",
  },
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInAlgorithmFolder",
    message: `       - Would you like to delete ${blueColor}SOLVED - ALGORITHM folder${whiteColor}?`,
    default: true,
    suffix: " 🟡",
  },
  // SECTION DELETE MAIN FOLDERS
  {
    prefix: "\n⠋🟡 5)",
    type: "confirm",
    name: "deleteMainAllFolders",
    message: `MAIN FOLDERS:\n       - Would you like to delete ${blueColor}MAIN - All Folders?${whiteColor}?`,
    default: true,
    suffix: " 🟡",
  },   
  {
    prefix: "",
    type: "confirm",
    name: "deleteMainInChallengeFolder",
    message: `       - Would you like to delete ${blueColor}MAIN - CHALLENGE Folder${whiteColor}?`,
    default: false,
    suffix: " 🟡",
  }
];

const questionsContinue = (message) => [
  {
    prefix: "\n⠋🟡🟡🟡",
    type: "confirm",
    name: "isContinue",
    // message: `Would you like to ${blueColor}COPY & DELETE per the SELECTIONS${whiteColor}?`,
    message: `${message}`,
    default: false,
    suffix: " 🟡",
  },
];

const questionCommitMessage = [
  {
    prefix: "⠋🟡 6)",
    type: "input",
    name: "commitMessage",
    message: `${whiteColor}Enter the ${blueColor}GIT COMMIT MESSAGE${whiteColor}?`,
    default: "UPDATE GITLAB CONTENT",
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "Commit Message");
    },
  },
];

module.exports = {
  questionContentDirectory,
  questionDirectoryToCopy,
  questionsDestinationPath,
  questionsContinue,
  questionCommitMessage,
};
