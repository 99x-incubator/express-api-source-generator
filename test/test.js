require = require('esm')(module /*, options*/);

const assert = require('assert');
const cli = require('../src/cli');

describe('Parse arguments into options', function () {
  it('should suggest default arguments', function () {
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
        name : 'projectname',
        skipPrompts: true,
        desc: undefined,
        runInstall: false,
        template: undefined,
        git: false
      }
    );
  });
});
