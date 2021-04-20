const fetch = require('node-fetch')

async function fetchContributions(token, username) {
  const years = await getContributionYears(token, username)
  const yearsAsc = years.sort((a, b) => a > b)
  const contributions = await Promise.all(
    yearsAsc.map((year) => getContributionCountPerYear(token, username, year))
  )

  return contributions.reduce((a, i) => a + i, 0)
}

function fetchGithubAPI(token, query) {
  const body = JSON.stringify({ query })

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    body,
    headers: { Authorization: `bearer ${token}` },
  }).then((resp) => resp.json())
}

async function getContributionYears(token, username) {
  const query = `
  query { 
    user(login: "${username}") { 
      contributionsCollection {
        contributionYears
      }
    }
  }`

  const years = await fetchGithubAPI(token, query)
  return years.data.user.contributionsCollection.contributionYears
}

async function getContributionCountPerYear(token, username, year) {
  const from = new Date(year, 0, 1).toISOString()
  const query = `
  query { 
    user(login: "${username}") { 
      contributionsCollection(from: "${from}") {
        contributionYears
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
        }
      }
    }
  }`

  const contributions = await fetchGithubAPI(token, query)
  return contributions.data.user.contributionsCollection.contributionCalendar
    .totalContributions
}

module.exports = fetchContributions
