const path = require("path");
const os = require('os');
const { adjustWin32Path } = require("../../../utilities/adjustWin32Path");

createDirectoriesCopyDeleteRules = async (
  destinationInformation,
  contentDirectory,
  sourceDirectory
) => {

  let destinationFolderName = path.basename(sourceDirectory);
  let destinationPath = "";

  if(os.platform() === "win32") {
    destinationPath = await adjustWin32Path(destinationInformation.destinationPath);
    console.log(destinationPath);
    contentDirectory = await adjustWin32Path(contentDirectory);
  } else {
    destinationPath = destinationInformation.destinationPath;
    contentDirectory = contentDirectory;
  }

  let destinationDirectory = `${destinationPath}/${destinationFolderName}`;
  let activityDirectory = `${destinationPath}/${destinationFolderName}/01-Activities`;
  let algorithmDirectory = `${destinationPath}/${destinationFolderName}/03-Algorithms`;
  
  destinationInformation.destinationPath = destinationPath;
  destinationInformation.isContinue = true;
  destinationInformation.contentDirectory = contentDirectory;
  destinationInformation.sourceDirectory = sourceDirectory;
  destinationInformation.destinationDirectory = destinationDirectory;
  destinationInformation.destinationFolderName = destinationFolderName;
  destinationInformation.activityDirectory = activityDirectory;
  destinationInformation.algorithmDirectory = algorithmDirectory;

  return destinationInformation;
};

module.exports = {
  createDirectoriesCopyDeleteRules,
}