// Require Employee.js
const Employee = require("./Employee");

// Inherit properties from the Employee class and add additional properties relevant to the Engineer class.
class Engineer extends Employee {
    constructor(name, id, email, gitHubUser) {
        super(name, id, email);
        this.github = gitHubUser;
        this.getRole = () => `Engineer`;
        this.getGithub = () => this.github;
    };
}

module.exports = Engineer;