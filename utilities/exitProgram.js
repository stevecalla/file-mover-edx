const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("./colors");
const { createClickableLink } = require('./hyperlinkBuyACoffee');

async function exitProgram(exitProcess = true) {
  console.log(`\n${whiteColor}See${greenColor} ya ${blueColor}soon${redColor}!!`);

  const clickableLink = createClickableLink();
  console.log(clickableLink);

  if (exitProcess) {
    process.exit();
  }
};

module.exports = {
  exitProgram,
}