const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("./colors");
const { createClickableLink } = require('./hyperlinkBuyACoffee');

// async function exitProgram(exitProcess = true) {
//   console.log(`\n${whiteColor}See${greenColor} ya ${blueColor}soon${redColor}!!`);

//   const clickableLink = await createClickableLink();
//   console.log(clickableLink);

//   if (exitProcess) {
//     process.exit();
//   }
// }

async function exitProgram(exitProcess = true) {
  if (exitProcess) {
    process.exit();
  }
}

async function exitMessage() {
  const clickableLink = await createClickableLink();
  
  let message = `\n${whiteColor}See${greenColor} ya ${blueColor}soon${redColor}!!\n${clickableLink}`;
  
  // console.log(message);

  return message;
}

exitMessage();

module.exports = {
  exitProgram,
  exitMessage,
}