const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
let man;
let eng;
let int;

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        },
        {
            type: "list",
            message: "Please select your role.",
            name: "title",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then (res => {
        const info = res;
        if (info.title === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please enter your office number.",
                    name: "officeNumber"
                }
        ]).then (res => {
            man = new Manager(info.name, info.id, info.email,res.officeNumber);
            console.log(man);
        })
    };
        if (info.title === "Engineer"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please enter your Github username",
                    name: "github"
                }
        ]).then (res => {
            eng = new Engineer(info.name, info.id, info.email, res.github);
            console.log(eng);
        })
    };
        if (info.title === "Intern"){
            inquirer.prompt([
                {
                    type: "input",
                    message: "Which college do/did you attend?",
                    name: "school"
                }
        ]).then (res => {
            int = new Intern(info.name, info.id, info.email, res.school);
            console.log(int);
        })
    };
});

// new objects are created, how do I create multiple engineer/interns? 
    //how to save the variables as the this.id number or something unique.
    //what do do with the info? 
        //create a single html file and have the information populated into it?
        //create individial html files and concat somehow?
