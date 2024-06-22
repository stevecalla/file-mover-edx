const {
  blueColor,
  whiteColor,
} = require("./colors");

capitalizeFirstCharacter = (answer) => {
  str = answer.trim();
  let firstChar = answer.charAt(0).toUpperCase();
  let otherChar = answer.slice(1, str.length).toLowerCase();
  answer = `${firstChar}${otherChar}`;
  return answer;
};

lowerCase = (answer) => {
  return answer.trim().toLowerCase();
};

isNumber = (answer) => {
  if (!isNaN(answer)) {
    return true;
  }
  return "Please provide a number (with no letters).";
};

isEmail = (answer) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(answer)) {
    return "Please provide a valid email address!";
  }
  return true;
};

isBlank = (answer, name) => {
  if (!answer || answer.trim() === "") {
    return `Please, provide a ${name}.`;
  }
  return true;
};

isPathStartsWithSlash = (answer) => {
  const regex = /^\//;
  const examplePath = "/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC";

  if (!regex.test(answer)) {
    return `Invalid Path. Must start with a ${blueColor}slash similar to ${examplePath}${whiteColor}.`;
  }
   return true;
};

module.exports = {
  capitalizeFirstCharacter,
  lowerCase,
  isNumber,
  isEmail,
  isBlank,
  isPathStartsWithSlash,
};
