const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const newEmpireList = [];


function runApp(){
//create manager - trigger call urn app outside of the run app calling manager,employee,engineer,inter function

function createManager() {
    console.log("Create your Empires' Manager");
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Who is the leader of this Empire?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Leaders ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Leaders email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the Leaders Office Number?",
      },
    ]).then(response => {
        const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        newEmpireList.push(newManager);
        buildEmpire();
    })
}
function buildEmpire(){
 inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Do you want to add someone to this Empire?",
        choices: ["Intern", "Engineer", "EMPIRE COMPLETE!"]
      }
    ]).then(response => {
        switch(response.choice){
            case "Intern": 
            createIntern();
            break
            case "Engineer":
            createEngineer();
            break
            default:
            createEmpire();
        }
    })
}
function createIntern(){
    inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Who is the Intern for this Empire?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the Intern's ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the Interns email?",
        },
        {
          type: "input",
          name: "school",
          message: "What is the name of the Intern's School?",
        },
      ])
      .then((response) => {
        const newIntern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        newEmpireList.push(newIntern);
        buildEmpire();
      });
}
function createEngineer() {
  inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Who is the Engineer for this Empire?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Engineer's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is this Engineer's GitHub?",
      },
    ])
    .then((response) => {
      const newEngineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      newEmpireList.push(newEngineer);
      buildEmpire();
    });
}
function createEmpire(){
 if(!fs.existsSync(OUTPUT_DIR)){
     fs.mkdirSync(OUTPUT_DIR);
 } 
 fs.writeFileSync(outputPath, render(newEmpireList), "utf-8");

}








createManager();
};

runApp();
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
