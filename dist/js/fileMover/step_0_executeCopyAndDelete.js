const {
  matchPattern01To10,
  matchPattern11To20,
  matchPattern21To28,
  matchPatternChallenge,
  directoryToDeleteSolved,
  directoryToDeleteMain,
} = require("../../../utilities/directoryLibrary");
const { copyFilesToDestination } = require("./step_2_copyMoveAllDirectoriesFiles"); // step 2
const { deleteAllDirectories } = require("./step_3_deleteAllDirectories");
const { deleteSelectDirectories } = require("./step_5a_deleteSelectDirectories");

// SECTION - execute_copy_and_delete FUNCTION
async function execute_copy_and_delete(copyAndDeleteDetails) {
  await copyMoveAllFiles(copyAndDeleteDetails);

  await deleteAllSolved(copyAndDeleteDetails);
  await deleteSolvedInActivity01To10(copyAndDeleteDetails);
  await deleteSolvedInActivity11To20(copyAndDeleteDetails);
  await deleteSolvedInActivity21To28(copyAndDeleteDetails);
  await deleteSolvedInAlgorithmFolder(copyAndDeleteDetails);

  await deleteAllMain(copyAndDeleteDetails);
  await deleteMainInChallengeFolder(copyAndDeleteDetails);
}

// SECTION - STEP #1: COPY ALL FILES FROM SOURCE TO DESTINATION
async function copyMoveAllFiles(copyAndDeleteDetails) {
  try {
    console.log('copy & delete = ', copyAndDeleteDetails);
    const { isContinue, sourceDirectory, destinationDirectory } = copyAndDeleteDetails;

    if(isContinue) {
      await copyFilesToDestination(sourceDirectory, destinationDirectory);
      console.log(`\n✅ Files copied to destination successfully`);
    }
  } catch (error) {
    console.log('Error - Copy all files:', error);
  }
}

// SECTION - STEP #2: DELETE ALL SOLVED
async function deleteAllSolved(copyAndDeleteDetails) {
  try {
    const { deleteSolvedAllFolders, destinationDirectory } = copyAndDeleteDetails;
  
    if(deleteSolvedAllFolders) {
      await deleteAllDirectories(destinationDirectory, directoryToDeleteSolved);
      console.log('✅ Deleted all solved successfully');
    } 
  } catch (error) {
    console.log('Error - Delete all solved:', error);
  }
}

async function deleteSolvedInActivity01To10(copyAndDeleteDetails) {
  try {
    const { deleteSolvedInActivity01To10, activityDirectory } = copyAndDeleteDetails;

    if(deleteSolvedInActivity01To10) {
      await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern01To10);
      console.log('✅ Deleted solved 01 to 10 successfully');
    } 
  } catch (error) {
    console.log('Error - Delete solved 01 to 10:', error);
  }
}

async function deleteSolvedInActivity11To20(copyAndDeleteDetails) {
  try {
    const { deleteSolvedInActivity11To20, activityDirectory } = copyAndDeleteDetails;

    if(deleteSolvedInActivity11To20) {
      await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern11To20);
      console.log('✅ Deleted solved 11 to 20 successfully');
    } 
  } catch (error) {
    console.log('Error - Delete solved 11 to 20:', error);
  }
}

async function deleteSolvedInActivity21To28(copyAndDeleteDetails) {
  try {
    const { deleteSolvedInActivity21To28, activityDirectory } = copyAndDeleteDetails;

    if(deleteSolvedInActivity21To28) {
      await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern21To28);
      console.log('✅ Deleted solved 21 to 28 successfully');
    } 
  } catch (error) {
    console.log('Error - Delete solved 21 to 28:', error);
  }
}

async function deleteSolvedInAlgorithmFolder(copyAndDeleteDetails) {
  try {
    const { deleteSolvedInAlgorithmFolder, algorithmDirectory } = copyAndDeleteDetails;

    if(deleteSolvedInAlgorithmFolder) {
      await deleteSelectDirectories(algorithmDirectory, directoryToDeleteSolved, matchPattern01To10);
      console.log('✅ Deleted solved in algorithm successfully');
    } 
  } catch (error) {
    console.log('Error - Delete solved in algorithm:', error);
  }
}

// SECTION - STEP #3: DELETE ALL execute_copy_and_delete
async function deleteAllMain(copyAndDeleteDetails) {
  try {
    const { deleteMainAllFolders, destinationDirectory } = copyAndDeleteDetails;

    if(deleteMainAllFolders) {
      await deleteAllDirectories(destinationDirectory, directoryToDeleteMain);
      console.log('✅ Deleted all main successfully');
    } 
  } catch (error) {
    console.log('Error - Delete all main:', error);
  }
}

async function deleteMainInChallengeFolder(copyAndDeleteDetails) {
  try {
    const { deleteMainInChallengeFolder, destinationDirectory } = copyAndDeleteDetails;
    
    if(deleteMainInChallengeFolder) {
      await deleteSelectDirectories(destinationDirectory, directoryToDeleteMain, matchPatternChallenge);
      console.log('✅ Deleted main in challenge folder successfully');
    } 
  } catch (error) {
    console.log('Error - Delete main in challenge:', error);
  }
}

module.exports = {
  execute_copy_and_delete,
}
