require = require('esm')(module /*, options*/);

const assert = require('assert');
const cli = require('../src/cli');

describe('Parse command line arguments into options', function () {
  it('should parse all arguments', function () {
    assert.deepEqual(
      cli.parseArgumentsIntoOptions(
        [
          'node-executable-path/node',
          'express-starter-path/express-starter',
          'projectname',
          '--desc',
          'projectdesciption',
          '--install',
          '--template',
          'default',
          '--git'
        ]
      ),
      {
        name: 'projectname',
        skipPrompts: false,
        desc: 'projectdesciption',
        runInstall: true,
        template: 'default',
        git: true
      }
    );
  });

  it('should suggest default arguments when skipped', function () {
    assert.deepEqual(
      cli.parseArgumentsIntoOptions(
        [
          'node-executable-path/node',
          'express-starter-path/express-starter',
          'projectname',
          '--yes'
        ]
      ),
      {
        name: 'projectname',
        skipPrompts: true,
        desc: undefined,
        runInstall: false,
        template: undefined,
        git: false
      }
    );
  });

  it('should leave one option default if not provided as an argument', function () {
    assert.deepEqual(
      cli.parseArgumentsIntoOptions(
        [
          'node-executable-path/node',
          'express-starter-path/express-starter',
          'projectname',
          '--desc',
          'projectdesciption',
          '--install',
          '--template',
          'default',
        ]
      ),
      {
        name: 'projectname',
        skipPrompts: false,
        desc: 'projectdesciption',
        runInstall: true,
        template: 'default',
        git: false
      }
    );
  });

  it('should leave one undefined if not provided as an argument', function () {
    assert.deepEqual(
      cli.parseArgumentsIntoOptions(
        [
          'node-executable-path/node',
          'express-starter-path/express-starter',
          'projectname',
          '--desc',
          'projectdesciption',
          '--install',
          '--git'
        ]
      ),
      {
        name: 'projectname',
        skipPrompts: false,
        desc: 'projectdesciption',
        runInstall: true,
        template: undefined,
        git: true
      }
    );
  });
});
