const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

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

// add employees function

let managerArray = ['Not listed']

function addEmployee() {
    const query = 'SELECT * FROM employee WHERE employee.role_id = 1';
    connection.query(query, function (err, res) {
        if (err) throw err;

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
            },

            {
                type: 'list',
                name: 'manager name',
                message: 'Who is their manager?',
                choices: function () {
                    let managerArray = ['Not listed']
                    // const employeeId = [];
                    for (let i = 0; i < res.length; i++) {
                        managerArray.push(res[i].first_name + ' ' + res[i].last_name + ' ' + res[i].id);

                    }
                    return (managerArray);

                }

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
                            role_id: 2
                        })

                        break;
                    case ('Lead Engineer'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 3
                        })

                        break;
                    case ('Software Engineer'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 4
                        })
                        break;
                    case ('Accountant'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 5
                        })
                        break;
                    case ('Legal Team-Lead'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 6
                        })
                        break;
                    case ('Lawyer'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 7
                        })
                        break;
                }
                startProgram();
            })
    })
}
//view all employees
function viewAll() {
    const query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {

            console.table([{ id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, role_id: res[i].role_id }])
        }
    })
}

//view all employees by dept.

function employeeByDept() {
    inquirer
        .prompt([
            {
                name: 'dept',
                type: 'list',
                message: 'Which dept would you like to see?',
                choices: [
                    'Sales',
                    'Engineering',
                    'Finance',
                    'Legal'
                ]
            }
        ]).then(answers => {
            const query = 'SELECT employee.role_id, employee.first_name, employee.last_name FROM employee INNER JOIN department ON (employee.role_id = department.id) WHERE (department.name = ?)';
            connection.query(query, [answers.dept], function (err, res) {
                console.log('There are ' + res.length + ' employees in this dept!')
                for (let i = 0; i < res.length; i++) {
                    console.log(
                        'ID:  ' + res[i].role_id + '  ||  First Name: ' + res[i].first_name + '  ||  Last Name: ' + res[i].last_name
                    )
                }
            })
        })
}

// function to remove employee

function removeEmployee() {

    const query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;


        inquirer
            .prompt([{
                type: 'list',
                name: 'remove',
                message: 'Which employee would you like to remove?',
                choices: function () {
                    const employeeArr = [];
                    // const employeeId = [];
                    for (let i = 0; i < res.length; i++) {
                        employeeArr.push(res[i].first_name + ' ' + res[i].last_name + ' ' + res[i].id);

                    }
                    return (employeeArr);

                }

            }]).then(answers => {
                console.log(answers)
                let newAnswer = answers.remove.split(' ')
                let id = newAnswer[2]
                console.log(id)
                connection.query('DELETE FROM employee WHERE ?',
                    {
                        id: id

                    })
            })

    })
}

// function managerLookUp() {

//     const query = 'SELECT * FROM employee WHERE employee.role = 1 AND employee.role = 3 AND employee.role = 6 ';
//     connection.query(query, function (err, res) {

//         if (err) throw err;
//     })

// }