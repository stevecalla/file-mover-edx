const fs = require("fs");

class WriteHTML {
  constructor() { }

  read(file) {
    return fs.readFileSync(file, "utf8");
  }

  write(path, data) {
    // console.log(path, data)
    return fs.writeFileSync(path, data);
  }
}

// function WriteHTML() {}

// WriteHTML.prototype.read = function(file) {
//   return fs.readFileSync(file, "utf8");
// };

// WriteHTML.prototype.write = function(path, data) {
//   // console.log(path, data)
//   return fs.writeFileSync(path, data);
// };

module.exports = WriteHTML;