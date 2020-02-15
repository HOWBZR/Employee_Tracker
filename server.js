const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startProgram();
});

function startProgram() {
    inquirer
        .prompt({
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by dept.',
                'View all employees by manager',
                'Add employee',
                'Remove employee',
                'Update employee role',
                'Update employee manager',
                'View all roles'
            ]
        }).then(answer => {
            switch (answer.start) {
                case "View all employees":
                    viewAll();
                    break;

                case "View all employees by dept.":
                    employeeByDept();
                    break;

                case "View all employees by manager":
                    employeeByManager();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Remove employee":
                    removeEmployee();
                    break;
                case 'Update employee role':
                    updateEmployeeRole();
                    break;
                case 'Update employee manager':
                    updateEmployeeManager();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                default:
                    console.log('not working')
            }
        })

}

// view all roles function



function addEmployee() {
    console.log('working')
    inquirer
        .prompt([{
            type: 'input',
            name: 'first',
            message: 'What is their first name?'

        },
        {
            type: 'input',
            name: 'last',
            message: 'What is their last name?'
        },
        {
            type: 'list',
            name: 'title',
            message: 'What is their title?',
            choices: [
                'Sales Lead',
                'Sales Person',
                'Lead Engineer',
                'Software Engineer',
                'Accountant',
                'Legal Team-Lead',
                'Lawyer'
            ]
        }]).then(answers => {
            switch (answers.title) {
                case ('Sales Lead'):
                    connection.query(
                        'INSERT INTO employee SET ?', {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: 1
                    })
                    break;
                case ('Sales Person'):
                    connection.query(
                        'INSERT INTO employee SET ?', {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: 1
                    })
                    break;
                case ('Lead Engineer'):
                    connection.query(
                        'INSERT INTO employee SET ?', {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: 2
                    })
                    break;
                case ('Software Engineer'):
                    connection.query(
                        'INSERT INTO employee SET ?', {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: 2
                    })
                    break;
                case ('Accountant'):
                    connection.query(
                        'INSERT INTO employee SET ?', {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: 3
                    })
                    break;
                case ('Legal Team-Lead'):
                    connection.query(
                        'INSERT INTO employee SET ?', {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: 4
                    })
                    break;
                case ('Lawyer'):
                    connection.query(
                        'INSERT INTO employee SET ?', {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: 4
                    })
                    break;
            }
        })
}
