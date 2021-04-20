async function fetchContributions(token, username) {
  const years = await getContributionYears(token, username)
  const yearsAsc = years.sort((a, b) => a > b)
  const contributions = await Promise.all(
    yearsAsc.map((year) => getContributionCountPerYear(token, username, year))
  )

  return contributions.reduce((a, i) => a + i, 0)
}

const { fetchGithubAPI } = require('./github-utils')

async function getContributionYears(token, username) {
  const query = `query {
    user(login: "${username}") {
      contributionsCollection {
        contributionYears
      }
    }
  }`

  const { data } = await fetchGithubAPI(token, query)
  return data.user.contributionsCollection.contributionYears
}

async function getContributionCountPerYear(token, username, year) {
  const from = new Date(year, 0, 1).toISOString()
  const query = `query {
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

  const { data } = await fetchGithubAPI(token, query)
  return data.user.contributionsCollection.contributionCalendar
    .totalContributions
}

module.exports = {
  fetchContributions,
  getContributionYears,
  getContributionCountPerYear,
}
