const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("./colors");
const { createClickableLink } = require('./hyperlinkBuyACoffee');

async function exitCommand(exitProcess = true) {
  if (exitProcess) {
    process.exit();
  }
}

async function exitMessage() {
  try {
    const clickableLink = await createClickableLink();

    let message = `\n${whiteColor}See${greenColor} ya ${blueColor}soon${redColor}!!\n${clickableLink}`;

    return message;
  } catch (error) {
    // Handle any errors from createClickableLink
    console.error('Error in exitMessage:', error);
    throw error; // Re-throw the error to propagate it further if needed
  }
}

async function exitProgram() {
  try {
    let message = await exitMessage();
    console.log(message);
    
    await exitCommand();
  } catch (error) {
    console.error('Error logging exit message:', error);
  }
}

// exitMessage();

module.exports = {
  exitProgram,
  exitCommand,
  exitMessage
}