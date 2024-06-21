const matchPattern01To10 = /^(0[1-9]|10)/;      // 01 to 10
const matchPattern11To20 = /^(1[1-9]|20)/;      // 11 to 20
const matchPattern21To28 = /^(2[1-8])/;         // 21 to 28
const matchPatternChallenge = /^02-Challenge/;  // 02-Challenge

const directoryToDeleteSolved = "Solved";       // Solved
const directoryToDeleteMain = "Main";           // Main

module.exports = {
  matchPattern01To10,
  matchPattern11To20,
  matchPattern21To28,
  matchPatternChallenge,
  directoryToDeleteSolved,
  directoryToDeleteMain,
};
