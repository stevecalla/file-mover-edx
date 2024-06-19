const path = require('path');
// SECTION SET UPCOMING WEEK
// const weekNumber = 21 - 1; // Week 21 = index of array or 21 - 1

// SECTION SET CURRENT WEEK
const weekNumber = 20 - 1; // Week 20 = index of array or 20 - 1

console.log(weekNumber);

const filePath =   
['/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/01-HTML-Git-CSS',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/02-Advanced-CSS',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/03-JavaScript',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/04-Web-APIs',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/05-Third-Party-APIs',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/06-Server-Side-APIs',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/07-Project-1',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/08-Project-1-Contd',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/09-NodeJS',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/10-OOP',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/11-Express',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/12-SQL',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/13-ORM',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/14-MVC',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/15-Project-2',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/16-Project-2-Contd',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/17-CS',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/18-NoSQL',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/19-PWA',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/20-React',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/21-MERN',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/22-State',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/23-Project-3',
'/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content/24-Project-3-Contd'
];

const matchPattern01To10 = /^(0[1-9]|10)/;   // 01 to 10
const matchPattern11To20 = /^(1[1-9]|20)/;   // 11 to 20
const matchPattern21To28 = /^(2[1-8])/;      // 21 to 28
const matchPatternChallenge = /^02-Challenge/;  //02-Challenge
const directoryToDeleteSolved = "Solved";
const directoryToDeleteMain = "Main";

const contentDirectory = "/Users/stevecalla/uoregon_fullstack/fullstack-live/01-Class-Content"; //used to retrieve the filePath array above
const sourceDirectory = filePath[weekNumber]; // 19-PWA

const destinationFolder = path.basename(sourceDirectory); // Outputs: 01-HTML-Git-CSS (or similar)
const destinationDirectory = `/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC/${destinationFolder}`;
const activityDirectory = `/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC/${destinationFolder}/01-Activities` // used to delete solved inside the 01-Activity directory
const algorithmDirectory = `/Users/stevecalla/uoregon_fullstack/UofO-VIRT-FSF-PT-01-2024-U-LOLC/${destinationFolder}/03-Algorithms` // used to delete solved inside the 01-Activity directory

// TEST DESTINAT DIRECTORIES
// const destinationDirectory = `/Users/stevecalla/file-mover-edx/01-Class-Content-Destination/${destinationFolder}`;
// const activityDirectory = `/Users/stevecalla/file-mover-edx/01-Class-Content-Destination/${destinationFolder}/01-Activities` // used to delete solved inside the 01-Activity directory
// const algorithmDirectory = `/Users/stevecalla/file-mover-edx/01-Class-Content-Destination/${destinationFolder}/03-Algorithms` // used to delete solved inside the 01-Activity directory

module.exports = {
  sourceDirectory,
  activityDirectory,
  algorithmDirectory,
  destinationDirectory,
  contentDirectory,
  matchPattern01To10,
  matchPattern11To20,
  matchPattern21To28,
  matchPatternChallenge,
  directoryToDeleteSolved,
  directoryToDeleteMain,
}