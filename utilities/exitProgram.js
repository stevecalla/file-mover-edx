const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("./colors");
const { createClickableLink } = require('./hyperlinkBuyACoffee');

async function exitProgram() {
  console.log(`${whiteColor}Go${redColor}o${greenColor}d b${whiteColor}ye${blueColor}!!`);

  const clickableLink = createClickableLink();
  console.log(clickableLink);

  process.exit();
};

module.exports = {
  exitProgram,
}