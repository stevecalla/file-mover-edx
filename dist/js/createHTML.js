const fs = require("fs").promises;
const { managerTemplate, engineerTemplate, internTemplate, managerIcon, engineerIcon, internIcon } = require("../../src/roleTemplate.html");
const { profileTemplate } = require("../../src/profileTemplate.html");
const { homeTemplate } = require("../../src/homeTemplate.html");

createHTML = async (teamMembers) => {
  let iconHTML = "";
  let roleHTML = "";
  let membersHTML = "";
  
  //USED FOR OF STATEMENT BECAUSE IT SEMED TO WORK LIKE AN AWAIT STATEMENT WHILE MAP & FOR EACH DID NOT EXECUTE BEFORE THE NEXT WRITE FILE STATEMENT
  for (member of teamMembers) {
    switch(member.role) {
      case ("Engineer"):
        iconHTML = engineerIcon,
        roleHTML = engineerTemplate(member);
        membersHTML += profileTemplate(roleHTML, iconHTML, member);
        break;

      case ("Intern"):
        iconHTML = internIcon,
        roleHTML = internTemplate(member);
        membersHTML += profileTemplate(roleHTML, iconHTML, member);
        break;

      default:
        iconHTML = managerIcon,
        roleHTML = managerTemplate(member);
        membersHTML += profileTemplate(roleHTML, iconHTML, member);
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