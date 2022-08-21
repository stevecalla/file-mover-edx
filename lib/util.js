capitalizeFirstCharacter = (str) => {
  str = str.trim();
  // str = answer.toLowerCase();
  let firstChar = str.charAt(0).toUpperCase();
  let otherChar = str.slice(1, str.length).toLowerCase();
  str = `${firstChar}${otherChar}`
  return str;
}

lowerCase = (str) => {
  return str.trim().toLowerCase();
}

module.exports = {
  capitalizeFirstCharacter,
  lowerCase,
}