const os = require('os');
const { defaultContentDirectory, defaultDestinationDirectory } = require('./defaultDirectories');
const { isBlank } = require("../../../utilities/util");
const { blueColor, redColor, whiteColor } = require("../../../utilities/colors");

const questionContentDirectory = [
  {
    prefix: "⠋🟡 1)",
    type: "input",
    name: "contentDirectory",
    message: `${whiteColor}Enter the ${blueColor}CLASS CONTENT${whiteColor} directory?${redColor}`,
    default: defaultContentDirectory,
    suffix: " 🟡",
    validate(answer) {
      return isBlank(answer, "Class Content Directory");
    },
  },
];

const directoryToCopyText = `Please select the directory to copy ${blueColor}DIRECTORY TO COPY${whiteColor}?`;
const questionDirectoryToCopy = (directories) => [
  {
    prefix: "\n⠋🟡 2)",
    type: "rawlist",
    name: "directoryToCopy",
    message: directoryToCopyText,
    choices: directories,
    suffix: " 🟡",
  },
];

// SECTION GET DESTINATON INFORMATION
const allSolvedText = `SOLVED FOLDERS:\n       - Would you like to delete ${blueColor}SOLVED - All Folders${whiteColor}?`;
const solvedInActivity01To10Text = `       - Would you like to delete ${blueColor}SOLVED - ACTIVITIES 01 to 10${whiteColor}?`;
const solvedInActivity11To20Text = `       - Would you like to delete ${blueColor}SOLVED - ACTIVITIES 11 to 20${whiteColor}?`;
const solvedInActivity21To28Text = `       - Would you like to delete ${blueColor}SOLVED - ACTIVITIES 21 to 28${whiteColor}?`;
const solvedInAlgorithmFolderText = `       - Would you like to delete ${blueColor}SOLVED - ALGORITHM folder${whiteColor}?`;
const mainAllFoldersText = `MAIN FOLDERS:\n       - Would you like to delete ${blueColor}MAIN - All Folders?${whiteColor}?`;
const mainInChallengeFolderText = `       - Would you like to delete ${blueColor}MAIN - CHALLENGE Folder${whiteColor}?`;
const questionsDestinationPath = [
  // SECTION GET DESTINATION DIRECTORY
  {
    prefix: "\n⠋🟡 3)",
    type: "input",
    name: "destinationPath",
    message: `${whiteColor}Enter the ${blueColor}DESTINATION${whiteColor} directory?`,
    default: defaultDestinationDirectory,
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
    message: allSolvedText,
    default: true,
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity01To10",
    message: solvedInActivity01To10Text,
    default: false,
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity11To20",
    message: solvedInActivity11To20Text,
    default: false,
    suffix: " 🟡",
  }, 
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInActivity21To28",
    message: solvedInActivity21To28Text,
    default: false,
    suffix: " 🟡",
  },
  {
    prefix: "",
    type: "confirm",
    name: "deleteSolvedInAlgorithmFolder",
    message: solvedInAlgorithmFolderText,
    default: true,
    suffix: " 🟡",
  },
  // SECTION DELETE MAIN FOLDERS
  {
    prefix: "\n⠋🟡 5)",
    type: "confirm",
    name: "deleteMainAllFolders",
    message: mainAllFoldersText,
    default: true,
    suffix: " 🟡",
  },   
  {
    prefix: "",
    type: "confirm",
    name: "deleteMainInChallengeFolder",
    message: mainInChallengeFolderText,
    default: false,
    suffix: " 🟡",
  }
];

const questionsContinue = (message) => [
  {
    prefix: "\n⠋🟡🟡🟡",
    type: "confirm",
    name: "isContinue",
    message: `${message}`,
    default: false,
    suffix: " 🟡",
  },
];

const commitMessageText = `${whiteColor}    - Enter the ${blueColor}GIT COMMIT MESSAGE${whiteColor}?`;
const questionCommitMessage = [
  {
    prefix: "⠋🟡",
    type: "input",
    name: "commitMessage",
    message: commitMessageText,
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
