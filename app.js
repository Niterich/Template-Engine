const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
let manager;
let engineer;
let intern;
let teamMembersArray = [];

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the team members name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their ID number?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "email"
            },
            {
                type: "list",
                message: "Please select their team role.",
                name: "title",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ])
        .then(res => {
            const info = res;
            if (info.title === "Manager") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter the managers office number.",
                            name: "officeNumber"
                        }
                    ])
                    .then(res => {
                        manager = new Manager(
                            info.name,
                            info.id,
                            info.email,
                            res.officeNumber
                        );
                        console.log(manager);
                        teamMembersArray.push(manager);
                        wouldContinue();
                    });
            }
            if (info.title === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter the engineers Github username",
                            name: "github"
                        }
                    ])
                    .then(res => {
                        engineer = new Engineer(
                            info.name,
                            info.id,
                            info.email,
                            res.github
                        );
                        console.log(engineer);
                        teamMembersArray.push(engineer);
                        wouldContinue();
                    });
            }
            if (info.title === "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Which college do/did the intern attend?",
                            name: "school"
                        }
                    ])
                    .then(res => {
                        intern = new Intern(
                            info.name,
                            info.id,
                            info.email,
                            res.school
                        );
                        console.log(intern);
                        teamMembersArray.push(intern);
                        wouldContinue();
                    });
            }
        });
}

function wouldContinue(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "continue"
        }
    ]).then(res => {
        if (res.continue) {
            console.log(teamMembersArray);
            addEmployee();
        } else {
            buildTeam();
        }
    })
}

function buildTeam() {
    for (let i = 0; i < teamMembersArray.length; i++) {
        if (teamMembersArray[i].title === "Manager") {
            //generate a manager card from the html template
        }
        else if (teamMembersArray[i].title === "Engineer") {
            //generate an engineer card from the html template
        } else {
            //generate an intern card from the html template
        }
    }
}

addEmployee();

//to-do
    //build team function
        // 1.) create new "team.html" file (function)
        // 2.) inside each condition, generateHtml (card) for each specific role.
            // a.) create a generateHtml function that makes the card html for each role. genManagerCard, genEngineerCard, etc.
        // 3.) inside each condition, fs.appendFile the new html cards to the "team.html" file.
        // 4.) "team.html" file should be populated with all the current team data. The file will be overwritten every time the app runs.

        // doing the html creation functions inside the app.js file will allow for easy use of template literals