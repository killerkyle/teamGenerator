// Require Employee.js
const Employee = require("./Employee");

// Inherit properties from the Employee class and add additional properties relevant to the Intern class.
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.getRole = () => `Intern`;
        this.getSchool = () => this.school;
    };
}

module.exports = Intern;