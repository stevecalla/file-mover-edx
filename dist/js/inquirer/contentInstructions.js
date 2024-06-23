const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("../../../utilities/colors");

async function instructionsContent() {
  console.log(
  `\n${whiteColor}${redColor}  *****************    ${blueColor}*****************    ${whiteColor}*****************
  ${blueColor}Step #1: Input the "content" directory path.
  ${whiteColor}- Purpose:      Should contain the course content.
  - Path Pattern: ${redColor}"/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content"${whiteColor}
  - Validation:   (a) Can't be blank. (b) Must start with "/". (c) Must exist.
  - Default:      Change via the defaultDirectories.js to eliminate manual entry.
  - Folder:       Directory folder should open in the background for easy review.
  
  ${blueColor}Step #2: Select the folder with the desired course content to copy.
  ${whiteColor}- Purpose:      All contents in this folder will be copied from the "content" to the "destination" directory.
  - Source:       These folders are read from the "content" directory.
  
  ${blueColor}Step #3: Input the "destination" directory.
  ${whiteColor}- Purpose:      The intended directory location of the course content.
  - Path Pattern: ${redColor}"/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC"${whiteColor}
  - Validation:   (a) Can't be blank. (b) Must start with "/". (c) Must exist.
  - Default:      Change via the defaultDirectories.js to eliminate manual entry.
  
  ${blueColor}Step #4: Select files to delete including "solved" & "main" by folder.
  ${whiteColor}- Purpose:      Indicate which "solved" or "main" to delete.
  - Choices:      y = true, delete. n = false, don't delete.
  - Default:      Yes, Delete = All Solved, Algorithm Folder Solved, All Main, Challenge Main.
  - Folder:       Directory folder should open in the background for easy review.
  - Confirm:      Review selected options. Continue if appropriate.
  
  ${blueColor}Step #5: (optional) Git add, commit & push.
  ${whiteColor}- Purpose:      Automatically git add, commit, push the destination directory.
  - Default:      Will default to and confirm the "destination" directory.
  - Commit:       Input the commit message.
  - Confirm:      Continue if appropriate.
  
  ${blueColor}That It! Be Efficient & Good Luck!!
  ${redColor}Note: If the copy/delete results need to change, simply redo the process!!
  *****************    ${blueColor}*****************    ${whiteColor}*****************
  ${whiteColor}`
  );
}

// instructionsContent();

module.exports = {
  instructionsContent,
};
