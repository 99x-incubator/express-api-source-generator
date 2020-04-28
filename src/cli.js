import arg from 'arg';
import inquirer from 'inquirer';
import { createProject, validateProjectName } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--yes': Boolean,
            '--desc': String,
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
        desc: args['--desc'],
        template: args['--template'],
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        runInstall: args['--install'] || false,
    };
}

async function promptForProjectDetails(options) {
    const questions = [];
    if (!options.name) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'Please type in your project name',
            validate: validateProjectName
        });
    }

    if (!options.desc) {
        questions.push({
            type: 'input',
            name: 'desc',
            message: 'Please type in your project description'
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        name: options.name || answers.name,
        desc: options.desc || answers.desc,
    };
}

async function promptForMissingOptions(options) {
    const questions = [];
    const templateChoices = ['basic', 'default', 'node-express-api-auth'];
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
    options = await promptForProjectDetails(options);
    options = await promptForMissingOptions(options);

    await createProject(options);
}