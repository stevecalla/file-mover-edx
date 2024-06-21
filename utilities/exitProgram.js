const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("./colors");

async function exitProgram() {
  console.log(`\n${whiteColor}Go${redColor}o${greenColor}d b${whiteColor}ye${blueColor}!!\n`);
  process.exit();
};

module.exports = {
  exitProgram,
}