const { unflatten } = require('flat')
const { fetchGithubAPI } = require('./github-utils')
const { getContributionYears } = require('./fetch-contributions')
const { removeWhiteSpace } = require('./test-utils')

jest.mock('./github-utils')

describe('fetch-contributions', () => {
  describe('getContributionYears', () => {
    it('should call fetch with right query', async () => {
      const expectedYears = [2020, 2021]
      const githubAPIResponse = unflatten({
        'data.user.contributionsCollection.contributionYears': expectedYears,
      })
      fetchGithubAPI.mockResolvedValue(githubAPIResponse)
      const expectedQuery = `query {
            user(login: "test-user") {
              contributionsCollection {
                contributionYears
              }
            }
          }`
      const expectedToken = 'token'

      const result = await getContributionYears(expectedToken, 'test-user')
      expect(result).toEqual(expectedYears)
      const [token, query] = fetchGithubAPI.mock.calls[0]
      expect(token).toEqual(expectedToken)
      expect(removeWhiteSpace(query)).toEqual(removeWhiteSpace(expectedQuery))
    })
  })
})
