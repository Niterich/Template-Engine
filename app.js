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
                        teamMembersArray.push(manager);
                        wouldContinue();
                    });
            }
            if (info.title === "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message:
                                "Please enter the engineers Github username",
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
                        teamMembersArray.push(intern);
                        wouldContinue();
                    });
            }
        });
}

function wouldContinue() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to add another team member?",
                name: "continue"
            }
        ])
        .then(res => {
            if (res.continue) {
                addEmployee();
            } else {
                const html = mainHtmlGen();
                fs.writeFile(`./output/team.html`, html, (err, dt) => {
                    if (err) {
                        throw err;
                    }
                    console.log("success");
                });
            }
        });
}

function buildTeam() {
    let people = "";
    for (let i = 0; i < teamMembersArray.length; i++) {
        if (teamMembersArray[i].title === "Manager") {
            //generate a manager card from the html template
            people = people + genManagerCard(teamMembersArray[i]);
        } else if (teamMembersArray[i].title === "Engineer") {
            //generate an engineer card from the html template
            people = people + genEngineerCard(teamMembersArray[i]);
        } else {
            //generate an intern card from the html template
            people = people + genInternCard(teamMembersArray[i]);
        }
    }
    return people;
}

function mainHtmlGen(data) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Main</title>
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            />
            <link rel="stylesheet" href="style.css" />
        </head>
        <body>
            <div class="jumbotron">
                <h1 class="header text-center">My Team!</h1>
            </div>
            <div class="container"
                <div class="row"
                    ${buildTeam()}
                </div>
            </div>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        </body>
    </html>`;
}

function genManagerCard(data) {
    return `<div class="card col-5 m-2 pb-2" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <h5 class="card-title">Manager</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${data.id}</li>
        <li class="list-group-item">Email: ${data.email}</li>
        <li class="list-group-item">Office No: ${data.officeNumber}</li>
    </ul>
</div>`;
}

function genEngineerCard(data) {
    return `<div class="card col-5 m-2 pb-2" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <h5 class="card-title">Engineer</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${data.id}</li>
        <li class="list-group-item">Email: ${data.email}</li>
        <li class="list-group-item">GitHub: <a href="#">${data.github}</a></li>
    </ul>
</div>`;
}

function genInternCard(data) {
    return `<div class="card col-5 m-2 pb-2" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <h5 class="card-title">Intern</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${data.id}</li>
        <li class="list-group-item">Email: ${data.email}</li>
        <li class="list-group-item">School: ${data.school}</li>
    </ul>
</div>`;
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
