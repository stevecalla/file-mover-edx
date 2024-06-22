const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("../../../utilities/colors");

const instructionsContent = `Would you like to ${blueColor}COPY & DELETE per the SELECTIONS${whiteColor}`;
console.log(instructionsContent);

console.log()

module.exports = {
  instructionsContent,
};
