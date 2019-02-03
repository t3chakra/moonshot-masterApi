const request = require('request-promise-native')
const routes = require('./routes')

const getPodcasts = langPrefix => {
  return request({
    uri: `${routes.apiClient}/api/v1/${langPrefix}/podcasts`,
    json: true
  })
}

module.exports = {
  getPodcasts
}