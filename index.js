#!/usr/bin/env node

const chalk = require('chalk')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { _: username, token } = yargs(hideBin(process.argv)).argv

const { fetchContributions } = require('./fetch-contributions')

if (!token || typeof token !== 'string') {
  console.error(
    chalk.red(
      `You need to provide a github access token to access the contributor's information, please add --token YOUR_ACCESS_TOKEN.`
    )
  )
  process.exit(1)
}
fetchContributions(token, username).then((contributionCount) => {
  console.log(chalk.green(contributionCount))
})
