createTeamMemberList = (role, member, employeeDetails, teamMembers) => {
  // console.log(member, employeeDetails)
  member.role = role; //add role to the object
  member.icon = role === "Manager" ? "fa-mug-hot" : role === "Engineer" ? "fa-glasses" : "fa-user-graduate";
  member.showHide = role === "Manager" ? ["", "hide", "hide"] : role === "Engineer" ? ["hide", "", "hide"] : ["hide", "hide", ""];
  member[Object.keys(employeeDetails)] = Object.values(employeeDetails).join(''); //add role specific info
  teamMembers.push(member); //push employees into an array
  return teamMembers;
}

module.exports = {
  createTeamMemberList,
}