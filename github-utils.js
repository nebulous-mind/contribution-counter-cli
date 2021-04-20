const fetch = require('node-fetch')

function fetchGithubAPI(token, query) {
  const body = JSON.stringify({ query })

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    body,
    headers: { Authorization: `bearer ${token}` },
  }).then((resp) => resp.json())
}

module.exports = {
  fetchGithubAPI,
}
