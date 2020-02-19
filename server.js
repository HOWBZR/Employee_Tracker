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

// let managerArray = ['Not listed']

function addEmployee() {
    const query = 'SELECT * FROM employee WHERE employee.role_id IN (1,3,6)';
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
                name: 'manager',
                message: 'Who is their manager?',
                choices: function () {
                    let managerArray = ['Not listed']

                    for (let i = 0; i < res.length; i++) {
                        managerArray.push(res[i].first_name + ' ' + res[i].last_name);
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
                            role_id: 1,
                            manager_name: answers.manager


                        })
                        break;
                    case ('Sales Person'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 2,
                            manager_name: answers.manager
                        })

                        break;
                    case ('Lead Engineer'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 3,
                            manager_name: answers.manager
                        })

                        break;
                    case ('Software Engineer'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 4,
                            manager_name: answers.manager
                        })
                        break;
                    case ('Accountant'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 5,
                            manager_name: answers.manager
                        })
                        break;
                    case ('Legal Team-Lead'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 6,
                            manager_name: answers.manager
                        })
                        break;
                    case ('Lawyer'):
                        connection.query(
                            'INSERT INTO employee SET ?', {
                            first_name: answers.first,
                            last_name: answers.last,
                            role_id: 7,
                            manager_name: answers.manager
                        })
                }
                startProgram();
            })
    })
}
//VIEW ALL EMPLOYEES -------------------------------------------------------------------------------------
function viewAll() {
    const query = 'SELECT * FROM employee';
    let newTable = []
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            newTable.push({ id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, role_id: res[i].role_id })
        }
        console.table(newTable)
        startProgram();
    })
}

//VIEW EMPLOYEES BY DEPARTMENT-------------------------------------------------------------------------

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
            const query = 'SELECT department.name, employee.role_id, employee.first_name, employee.last_name FROM employee INNER JOIN department ON (employee.role_id = department.id) WHERE (department.name = ?)';
            let employeeTable = []
            connection.query(query, [answers.dept], function (err, res) {
                console.log('There are ' + res.length + ' employees in this dept!')
                for (let i = 0; i < res.length; i++) {
                    employeeTable.push({
                        first_name: res[i].first_name, last_name: res[i].last_name, Department: res[i].name
                    })
                }
                console.table(employeeTable)
            })
            startProgram();
        })
}

// REMOVE EMPLOYEE ----------------------------------------------------------------------------------------

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
                startProgram();
            })

    })
}
//UPDATE EMPLOYEE BY MANAGER -------------------------------------------------------------------
function employeeByManager() {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN  department ON role.department_id = department.id)'
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            console.table([{ id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, manager_name: res[i].manager_name }])
        }
        startProgram()
    })
}

//VIEW EMPLOYEES BY MANAGER----------------------------------------------------------------------------------
function employeeByManager() {
    const query = 'SELECT * FROM employee WHERE employee.role_id IN (1,3,6)';
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Which manager\'s employees do you want to see?',
                    choices: function () {
                        let managerArray = []

                        for (let i = 0; i < res.length; i++) {
                            managerArray.push(res[i].first_name + ' ' + res[i].last_name);
                        }
                        return (managerArray);

                    }
                }
            ]).then(answers => {
                const query = 'SELECT employee.first_name, employee.last_name FROM employee WHERE employee.manager_name = ? ';
                let listArr = []
                connection.query(query, [answers.manager], function (err, res) {
                    console.log(answers.manager + 'has ' + res.length + ' employees reporting to thme, here they are!')
                    for (let i = 0; i < res.length; i++) {
                        listArr.push({ first_name: res[i].first_name, last_name: res[i].last_name })
                    }
                    console.table(listArr)
                })
                startProgram();
            })
    })
}
// VIEW ALL ROLES ---------------------------------------------------------------------------------------
function viewAllRoles() {
    const query = 'SELECT role.title FROM employee INNER JOIN role ON employee.role_id = role.id'
    let roleList = []
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            roleList.push({ Roles: res[i].title })
        }
        console.table(roleList)
        startProgram()
    })
}

//UPDATE EMPLOYEE ROLE ---------------------------------------------------------------------------------

function updateEmployeeRole() {
    const query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                type: 'list',
                name: 'update',
                message: 'Which employee would you like to update ?',
                choices: function () {
                    const employeeArr = [];
                    for (let i = 0; i < res.length; i++) {
                        employeeArr.push(res[i].first_name + res[i].last_name);
                    }
                    return employeeArr;
                }
            },
            {
                type: 'list',
                name: 'title',
                message: 'What is their new title ?',
                choices: [
                    'Sales Lead',
                    'Sales Person',
                    'Lead Engineer',
                    'Software Engineer',
                    'Accountant',
                    'Legal Team - Lead',
                    'Lawyer'
                ]
            }
            ]).then(answers => {
        let newAnswers = []
    })