// Dependencies declared in the provided assignment template.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to contain all team members.
let team = [];

// Object to contain all ID numbers.
const ids = {};

// An array containing inquirer questions about the team manager.
const createManager = [

  {
    type: "input",
    name: "managerName",
    message: "Please enter the manager's name.",
    validate: validBlank
  },

  {
    type: "input",
    name: "managerId",
    message: "Please enter the manager's ID number.",
    validate: validId
  },

  {
    type: "input",
    name: "managerEmail",
    message: "Please enter the manager's email address.",
    validate: validEmail
  },

  {
    type: "input",
    name: "managerOffice",
    message: "Please enter the manager's office number.",
    validate: validBlank
  }
];

const createIntern = [

  {
    type: "input",
    name: "internName",
    message: "Please enter the intern's name.",
    validate: validBlank
  },

  {
    type: "input",
    name: "internId",
    message: "Please enter the intern's ID number.",
    validate: validId
  },

  {
    type: "input",
    name: "internEmail",
    message: "Please enter the intern's email address.",
    validate: validEmail
  },

  {
    type: "input",
    name: "internSchool",
    message: "Please enter the name of the intern's school.",
    validate: validBlank
  }
];

const createEngineer = [
{
  type: "input",
  name: "engineerName",
  message: "Please enter the engineer's name.",
  validate: validBlank
},

{
  type: "input",
  name: "engineerId",
  message: "Please enter the engineer's ID number.",
  validate: validId
},

{
  type: "input",
  name: "engineerEmail",
  message: "Please enter the engineer's email address.",
  validate: validEmail
},

{
  type: "input",
  name: "engineerGit",
  message: "Please enter the engineer's GitHub username.",
  validate: validGit
}
];


// A function that will create an object based manager in the manager class and push it into the team array.
newManager = () => {
  console.log(`
  *** Welcome to the Team Roster Generator. Let's build your team roster! ***
  `);
  inquirer.prompt(createManager).then(response => {
    const mgr = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice);
    team.push(mgr);


    console.log(`
    *** ` + response.managerName + ` has been added to the team roster! ***
    `);
    newEmployee();
  });
};

// A function that will prompt a user to select a role for a new member of the team, or finish building the team. When finished, calls the render function and passes it the array of team members.
newEmployee = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Please select a role for the next employee.",
      choices: [
        "Intern",
        "Engineer",
        "Finish or add new team members."
      ]
    }
  ])
  .then(response => {
    switch(response.role) {
      case "Intern":
        newIntern();
        break;
      case "Engineer":
        newEngineer();
        break;
      case "Finish or add new team members.":
        fs.writeFileSync(outputPath, render(team));
        console.log(`
        *** Your team roster has been created and written inside the team.html! ***
        `);
        break;
    }
  })
};

newIntern = () => {
  console.log(`
    Let's add a new intern to the team roster.
  `);
  inquirer.prompt(createIntern).then(response => {
    const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
    console.log(`
    *** ` + response.internName + ` has been added to the team roster! ***
    `);
    team.push(intern);


    newEmployee();
  });
};

newEngineer = () => {
  console.log(`
    Let's add a new engineer to the team roster.
  `);
  inquirer.prompt(createEngineer).then(response => {
    const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGit);
    console.log(`
    ***  ` + response.engineerName + ` has been added to the team roster! ***
    `);
    team.push(engineer);


    newEmployee();
  });
};

// Validation check that a required answer has not been left blank.
function validBlank(value) {
  if (value != "") return true;
  else return "This section can not be left blank.";
};

// Confirms that the user entered a valid email address.
function validEmail(value) {
  const addy = /\S+@\S+\.\S+/;
  if (value.match(addy)) return true;
  else return "Please enter a valid email address.";
};

// Confirms that the user entered a valid GitHub username.
async function validGit(value) {
  const queryUrl = `https://api.github.com/users/${value}`;
  try {
   const response = await axios.get(queryUrl);
    if (response.status === 200) return true;
  } catch (error) {
      return "Please enter a valid GitHub Username.";
  };
};

// Validation check that a given ID number is unique.
function validId(value) {
  if ((ids[value] === true) || (value === "")) return console.log("Please select a unique ID number.");
  ids[value] = true;
  return true;
};

// Call the functions to run the program!
newManager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```