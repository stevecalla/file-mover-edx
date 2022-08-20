createTeamMemberList = (role, member, employeeDetails, teamMembers) => {
  member.role = role; //add role to the object
  member[Object.keys(employeeDetails)] = Object.values(employeeDetails).join(''); //add role specific info
  teamMembers.push(member); //push employees into an array
  return teamMembers;
}

module.exports = {
  createTeamMemberList,
}