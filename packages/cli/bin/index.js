#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require('yargs');

const params = yargs
  .command(require('../module/generate'))
  .demandCommand()
  .help()
  .argv;

const msgBox = boxen(chalk.white.bold('Welcome to Zimus !'), {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'green',
  backgroundColor: '#555555',
});

console.log(msgBox);
