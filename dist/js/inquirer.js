const inquirer = require("inquirer");
 const employees = [];
  
  async function main(role = 'Manager') {
   // console.log(role)
    console.log(`\n\u001b[0;1mPLEASE ENTER THE ${role.toUpperCase()}\'S INFORMATION.`);
 
    //GET EMPLOYEE INFO
    let employee = await getEmployeeInfo();
    
    let employeeDetails = role === "Manager" ? await getManagerInfo() : role
     === "Engineer" ? await getEngineerInfo() : await getInternInfo();
    
    //  COMBINE EMPLOYEE INFO INTO ONE OBJECT
    employee.role = role;
    employee[Object.keys(employeeDetails)] = Object.values(employeeDetails).join('');
    //  console.log(employee);
    
    //PUSH EMPLOYEES INTO AN ARRAY
    employees.push(employee);
    console.log(employees);
    
    //DETERMINE IF USER WOULD LIKE TO ADD MORE EMPLOYEES
    await confirmContinue();
  }
 
  getEmployeeInfo = async () => {
   const employeeAnswers = await inquirer.prompt(promptEmployeeInfo);
   // console.log(employeeAnswers);
   return employeeAnswers;
  }
 
  getEmployeeRole = async () => {
   const selectRole = await inquirer.prompt(promptEmployeeRole);
   // console.log(selectRole);
   return selectRole;
  }
 
  getManagerInfo = async () => {
   const managerInfo = await inquirer.prompt(promptManagerInfo);
   // console.log(managerInfo);
   return managerInfo;
  }
 
  getEngineerInfo = async () => {
   const engineerInfo = await inquirer.prompt(promptEngineerInfo);
   // console.log(engineerInfo);
   return engineerInfo;
  }
 
  getInternInfo = async () => {
   const internInfo = await inquirer.prompt(promptInternInfo);
   // console.log(internInfo);
   return internInfo;
  }
 
  confirmContinue = async () => {
   const confirm = await inquirer.prompt(promptConfirmContinue);
   // console.log(confirm);
   if (confirm.confirmContinue) {
    let role = await getEmployeeRole();
    main(role.role);
   }
   return confirm;
  }
 
  const promptEmployeeRole = [
    {
      prefix: "\n⠋🟡 1)",
      type: "rawlist",
      name: "role",
      message: "Please select the employee's role?",
      choices: ['Engineer', 'Intern'],
      // pageSize: 10,
     //  default: 2,
      suffix: " 🟡",
    },
  ]
  
  const promptEmployeeInfo = [
   {
     prefix: "⠋🟡 1)",
     type: "input",
     name: "firstName",
     message: `\u001b[0;1mEnter the \x1b[36;1mfirst\u001b[0;1m name?`,
     default: "steve",
     suffix: " 🟡",
     validate(answer) {
       if (!answer) {
         return "Please, provide a first name.";
       }
       return true;
     },
     filter(answer) {
       answer = answer.trim();
       // answer = //to uppercase
       return answer;
     },
   },
   {
     prefix: "⠋🟡 2)",
     type: "input",
     name: "lastName",
     message: `\u001b[0;1mEnter the \x1b[36;1mlast\u001b[0;1m name?`,
     default: "calla",
     suffix: " 🟡",
     validate(answer) {
       if (!answer) {
         return "Please, provide a last name.";
       }
       return true;
     },
     filter(answer) {
       answer = answer.trim();
       // answer = //to uppercase
       return answer;
     },
   },
   {
     prefix: "⠋🟡 3)",
     name: "employeeId",
     type: "number",
     message: "Please enter the employee ID?",
     default: "1",
     // validate(input) {
     //   console.log(input)
     //   if (typeof input !== 'number') {
     //     return "Please provide a number!";
     //   }
     //   return true;
     // },
     filter(answer) {
       // answer = answer.trim();
       return answer;
     },
   },
   {
     prefix: "⠋🟡 4)",
     name: "emailAddress",
     type: "input",
     message: "Please enter the email address?",
     default: "callasteven@gmail.com",
     validate(answer) {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(answer)) {
         return "Please provide a valid email address!";
       }
       return true;
     },
   },
 ];
 
 const promptManagerInfo = [
   {
     prefix: "⠋🟡 5)",
     type: "input",
     name: "officeNumber",
     message: "Please enter the manager's office number?",
     default: "10",
     suffix: " 🟡",
     filter(answer) {
       return answer.trim();
     },
   },
 ]
 
 const promptEngineerInfo = [
   {
     prefix: "⠋🟡 5)",
     type: "input",
     name: "gitHubUserName",
     message: "Please enter the engineer's GitHub user name?",
     default: "stevecalla",
     suffix: " 🟡",
     filter(answer) {
       return answer.trim();
     },
   },
 ]
 
 const promptInternInfo = [
   {
     prefix: "⠋🟡 5)",
     type: "input",
     name: "internSchool",
     message: "Please enter the intern's school?",
     default: "Oxford",
     suffix: " 🟡",
     filter(answer) {
       //todo capitalize
       return answer.trim();
     },
   },
 ]
 
 const promptConfirmContinue = [
   {
     prefix: "\n⠋🟡 ",
     type: "confirm",
     name: "confirmContinue",
     message: `Would you like to add more employees?`,
     default: "true",
     suffix: " 🟡",
   },
 ]
  
  // main();

  const test = 'hello';

  module.exports = {
    main,
    employees,
  }