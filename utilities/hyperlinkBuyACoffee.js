// hyperlinkBuyACoffee.js
const { blueColor, whiteColor } = require("./colors");

const url = `https://www.buymeacoffee.com/stevecalla`;

const text = `${whiteColor}Visit ${blueColor}LINK${whiteColor} to support my work.\n${blueColor}${url}${whiteColor} (hover + cmd/ctrl + click)\n`;

function createClickableLink() {
  // ANSI escape sequences for hyperlink in terminals (ECMA-48)
  const ESC = '\u001B[';
  const OSC = '\u001B]';
  const BEL = '\u0007';

  // Format the hyperlink with tooltip: OSC 8 ; URI ; additional information BEL Label OSC 8 ; BEL
  const hyperlink = `${OSC}8;;${url}${BEL}${text}${OSC}8;;${BEL}`;

  // ANSI escape sequences for underline
  const underlineStart = `${ESC}4;`;
  const underlineEnd = `${ESC}24;27m`;

  // Combine all parts: underlineStart OSC 8 ; URI ; additional information BEL Label OSC 8 ; BEL underlineEnd
  const styledLink = `${underlineStart}${hyperlink}${underlineEnd}`;

  return styledLink;
}

// Example usage:
// const clickableLink = createClickableLink();
// console.log(clickableLink);

module.exports = {
  createClickableLink,
};
