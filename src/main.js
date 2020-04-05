import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const validate = require("validate-npm-package-name");
const gitignore = require(`gitignore`);

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

async function updatePackage(options) {
    const pjsonFile = path.join(process.cwd(), options.targetDirectory, 'package.json');
    const pjsonObject = require(pjsonFile);
    pjsonObject.name = options.name || process.cwd();
    pjsonObject.description = options.desc;

    return new Promise((resolve, reject) => {
        fs.writeFile(pjsonFile, JSON.stringify(pjsonObject, null, 2), (err) => {
            if (err) reject(err);
            else resolve();
        });
    })
}

async function initGit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    });

    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
}

function generateGitignore(options) {
    const gitignoreUrl = path.resolve(options.targetDirectory, '.gitignore');
    return new Promise((resolve, reject) => {
        gitignore.writeFile({ type: 'Node', file: fs.createWriteStream(gitignoreUrl) }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.name || process.cwd(),
    };

    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        '../../templates',
        options.template.toLowerCase()
    );
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    const nameValidation = validate(options.name);
    if (!nameValidation.validForNewPackages) {
        console.error('%s Invalid project name', chalk.red.bold('ERROR'));
        process.exit(2);
    }

    const tasks = new Listr([
        {
            title: 'Copy project files',
            task: () => copyTemplateFiles(options),
        },
        {
            title: 'Update project details',
            task: () => updatePackage(options),
        },
        {
            title: 'Initialize git',
            task: () => initGit(options),
            enabled: () => options.git,
        },
        {
            title: 'Generate .gitignore',
            task: () => generateGitignore(options),
            enabled: () => options.git,
        },
        {
            title: 'Install dependencies',
            task: () =>
                projectInstall({
                    cwd: options.targetDirectory,
                }),
            skip: () =>
                !options.runInstall
                    ? 'Pass --install to automatically install dependencies'
                    : undefined,
        },
    ]);

    await tasks.run();

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}

export async function validateProjectName(input) {
    const validation = await validate(input);
    return validation.validForNewPackages ? true : validation.errors;
}