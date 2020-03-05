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
        template: args['--template'] || 'Default',
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        runInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'Default';
    const questions = [];

    if (!options.name) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'Type in your project name',
            validate: nameValidator
        });
    }

    if (options.skipPrompts) {
        const answers = await inquirer.prompt(questions);
        return {
            ...options,
            name: options.name || answers.name,
            template: options.template || defaultTemplate,
        };
    }
    else {
        if (!options.template) {
            questions.push({
                type: 'list',
                name: 'template',
                message: 'Choose which project template to use',
                choices: ['Default', 'Basic'],
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

        if (!options.install) {
            questions.push({
                type: 'confirm',
                name: 'install',
                message: 'Install dependencies?',
                default: false,
            });
        }

        const answers = await inquirer.prompt(questions);
        return {
            ...options,
            name: options.name || answers.name,
            template: options.template || answers.template,
            git: options.git || answers.git,
            install: options.install || answers.install,
        };
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    console.log(options);

    await createProject(options);
}

const nameValidator = async (input) => {
    const validation = validate(input);
    return validation.validForNewPackages ? true : validation.errors;
}