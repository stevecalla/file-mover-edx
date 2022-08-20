const questionsRole = [
  {
    prefix: "\n⠋🟡",
    type: "rawlist",
    name: "role",
    message: "Please select the employee's role?",
    choices: ['Engineer', 'Intern'],
    // pageSize: 10,
   //  default: 2,
    suffix: " 🟡",
  },
]

const questionsBasicInfo = [
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

const questionsManager = [
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

const questionsEngineer = [
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

const questionsIntern = [
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

const questionsContinue = [
 {
   prefix: "\n⠋🟡",
   type: "confirm",
   name: "isContinue",
   message: `Would you like to add more employees?`,
   default: "true",
   suffix: " 🟡",
 },
]

module.exports = {
  questionsRole,
  questionsBasicInfo,
  questionsManager,
  questionsEngineer,
  questionsIntern,
  questionsContinue,
}