const request = require('request-promise-native')
const routes = require('./routes')

const getTopStories = langPrefix => {
  return request({
    uri: `${routes.apiClient}/api/v1/${langPrefix}/sports/top-stories`,
    json: true
  })
}

module.exports = {
  getTopStories
}




