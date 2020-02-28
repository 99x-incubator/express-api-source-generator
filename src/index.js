const chalk = require('chalk');
var figlet = require('figlet');
const log = console.log;

figlet('express-starter', function(err, data) {
    if (err) {
        log('Something went wrong...');
        console.dir(err);
        return;
    }
    log(data)
    log(chalk.blue("\nWelcome to the interacive Express bootstrapper!"))
});