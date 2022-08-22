const fs = require("fs").promises;
const { managerTemplate, engineerTemplate, internTemplate } = require("../../src/roleTemplate.html");
const { profileTemplate } = require("../../src/profileTemplate.html");
const { homeTemplate } = require("../../src/homeTemplate.html");

createHTML = async (teamMembers) => {
  let roleHTML = "";
  let membersHTML = "";
  
  //USED FOR OF STATEMENT BECAUSE IT SEMED TO WORK LIKE AN AWAIT STATEMENT WHILE MAP & FOR EACH DID NOT EXECUTE BEFORE THE NEXT WRITE FILE STATEMENT
  for (member of teamMembers) {
    switch(member.role) {
      case ("Engineer"):
        roleHTML = engineerTemplate(member);
        membersHTML += profileTemplate(roleHTML, member);
        break;

      case ("Intern"):
        roleHTML = internTemplate(member);
        membersHTML += profileTemplate(roleHTML, member);
        break;

      default:
        roleHTML = managerTemplate(member);
        membersHTML += profileTemplate(roleHTML, member);
        break;
    }
  }
  
  fs.writeFile("./index-draft.html", homeTemplate(membersHTML), function (err) {
    if (err) throw err;
    // console.log('It\'s saved!');
  });
  return membersHTML;
}

module.exports = {
  createHTML
}