#!/usr/bin/env node

const chalk = require('chalk')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const {_: username, token} = yargs(hideBin(process.argv)).argv


const fetchContributions = require('./fetch-contributions')
fetchContributions(token, username).then(contributionCount=> {
  console.log(chalk.green(contributionCount))
})