const {
  destinationDirectory,
  matchPattern01To10,
  matchPattern11To20,
  matchPattern21To28,
  matchPatternChallenge,
  directoryToDeleteSolved,
  directoryToDeleteMain,
  activityDirectory,
  algorithmDirectory,
} = require("./step_0a_defineDirectories");
const { copyFilesToDestination } = require("./step_2_copyMoveAllDirectoriesFiles"); // step 2
const { deleteAllDirectories } = require("./step_3_deleteAllDirectories");
const { deleteSelectDirectories } = require("./step_5a_deleteSelectDirectories");

// SECTION CLASS #3: 
// UPCOMING WEEK
// const runStep2 = true;    // copyMoveAllDirectoriesFiles.js
// const runStep3a = true;   // deleteAllDirectories.js = solved
// const runStep3b = true;   // deleteAllDirectories.js = main

// const runStep4a = false;   // deleteSelectDirectories = starts with 01 to 10
// const runStep4b = false;   // deleteSelectDirectories = starts with 11 to 20
// const runStep4c = false;   // deleteSelectDirectories = starts with 21 to 28
// const runStep4d = false;   // deleteSelectDirectories.js = 03-Algorithms
// const runStep4e = false;   // deleteSelectDirectories.js = 02-Challenge

// CURRENT WEEK
const runStep2 = true;    // copyMoveAllDirectoriesFiles.js
const runStep3a = false;   // deleteAllDirectories.js = solved
const runStep3b = false;   // deleteAllDirectories.js = main

const runStep4a = false;   // deleteSelectDirectories = starts with 01 to 10
const runStep4b = false;   // deleteSelectDirectories = starts with 11 to 20
const runStep4c = false;   // deleteSelectDirectories = starts with 21 to 28
const runStep4d = false;   // deleteSelectDirectories.js = 03-Algorithms
const runStep4e = true;   // deleteSelectDirectories.js = 02-Challenge

// SECTION CLASS #2:
// CURRENT WEEK
// const runStep2 = true;    // copyMoveAllDirectoriesFiles.js
// const runStep3a = false;   // deleteAllDirectories.js = solved
// const runStep3b = false;   // deleteAllDirectories.js = main

// const runStep4a = false;   // deleteSelectDirectories = starts with 01 to 10
// const runStep4b = false;   // deleteSelectDirectories = starts with 11 to 20
// const runStep4c = true;   // deleteSelectDirectories = starts with 21 to 28
// const runStep4d = true;   // deleteSelectDirectories.js = 03-Algorithms
// const runStep4e = true;   // deleteSelectDirectories.js = 02-Challenge 

// SECTION CLASS #1: 
// const runStep2 = true;    // copyMoveAllDirectoriesFiles.js
// const runStep3a = false;   // deleteAllDirectories.js = solved
// const runStep3b = false;   // deleteAllDirectories.js = main

// const runStep4a = false;   // deleteSelectDirectories = starts with 01 to 10
// const runStep4b = true;   // deleteSelectDirectories = starts with 11 to 20
// const runStep4c = true;   // deleteSelectDirectories = starts with 21 to 28
// const runStep4d = true;   // deleteSelectDirectories.js = 03-Algorithms
// const runStep4e = true;   // deleteSelectDirectories.js = 02-Challenge 

async function main() {
  // COPY ALL FILES FROM SOURCE TO DESTINATION
  runStep2 && (await copyFilesToDestination());

  // DELETE SOLVED
  runStep3a && (await deleteAllDirectories(destinationDirectory, directoryToDeleteSolved));

  // // DELETE MAIN
  runStep3b && (await deleteAllDirectories(destinationDirectory, directoryToDeleteMain));

  // DELETE SELECT SOLVED (DELETES SOLVED FOR FOLDER GROUPS 01 TO 10, 11 TO 20, 21 TO 28)
  runStep4a && (await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern01To10));
  runStep4b && (await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern11To20));
  runStep4c && (await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern21To28));
  
  // DELETE SOLVED IN ALGO FOLDER AS NECESSARY
  runStep4d && (await deleteSelectDirectories(algorithmDirectory, directoryToDeleteSolved, matchPattern01To10));

  // DELETE SELECT MAIN (DELETES THE MAIN IN THE CHALLENGE FOLDER)
  runStep4e && await deleteSelectDirectories(destinationDirectory, directoryToDeleteMain, matchPatternChallenge); 
}

main();

// module.exports = {
//   weekNumber,
// }
