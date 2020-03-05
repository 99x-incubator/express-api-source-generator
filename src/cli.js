import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

const validate = require("validate-npm-package-name");

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--yes': Boolean,
            '--template': String,
            '--git': Boolean,
            '--install': Boolean,
            '-y': '--yes',
            '-g': '--git',
            '-i': '--install',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        name: args._[0],
        template: args['--template'],
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        runInstall: args['--install'] || false,
    };
}

async function promptForProjectName(options) {
    const questions = [];
    if (!options.name) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'Please type in your project name',
            validate: nameValidator
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        name: options.name || answers.name,
    };
}

async function promptForMissingOptions(options) {
    const questions = [];
    const templateChoices = ['default', 'basic'];
    const defaultTemplate = 'default';

    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Choose which project template to use',
            choices: templateChoices,
            default: defaultTemplate,
        });
    }
    else if (!templateChoices.includes(options.template)) {
        // invalid template
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Choose one of the available project templates to use',
            choices: templateChoices,
            default: defaultTemplate,
        });
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        });
    }

    if (!options.runInstall) {
        questions.push({
            type: 'confirm',
            name: 'runInstall',
            message: 'Install dependencies?',
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: answers.template || options.template,
        git: options.git || answers.git,
        runInstall: options.runInstall || answers.runInstall,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForProjectName(options);
    options = await promptForMissingOptions(options);

    await createProject(options);
}

const nameValidator = async (input) => {
    const validation = validate(input);
    return validation.validForNewPackages ? true : validation.errors;
}