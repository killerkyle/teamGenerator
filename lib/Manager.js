// Require Employee.js
const Employee = require("./Employee");

// Inherit properties from the Employee class and add additional properties relevant to the manager class.
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.getRole = () => `Manager`;
        this.getOfficeNumber = () => this.officeNumber;
    };
}

module.exports = Manager;